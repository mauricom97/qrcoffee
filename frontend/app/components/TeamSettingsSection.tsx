"use client";

import { useCallback, useEffect, useState } from "react";
import { getAuthHeaders, useAuth } from "contexts/AuthContext";
import { useLocaleContext } from "i18n/LocaleContext";
import LoadingSpinner from "components/LoadingSpinner";
import {
  PANEL_PERMISSION_LIST,
  type PanelPermissionCode,
} from "lib/panelPermissions";

const API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3352";

type TeamUserRow = {
  uuid: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  groups: { uuid: string; name: string }[];
};

type TeamGroupRow = {
  uuid: string;
  name: string;
  permissions: string[];
  createdAt: string;
  users: { uuid: string; email: string; name: string; role: string }[];
};

/** Bloco de equipe e grupos para a página de configurações (somente ADMIN). */
export default function TeamSettingsSection() {
  const { t } = useLocaleContext();
  const { user, isLoading: authLoading } = useAuth();
  const [users, setUsers] = useState<TeamUserRow[]>([]);
  const [groups, setGroups] = useState<TeamGroupRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<"STAFF" | "ADMIN">("STAFF");
  const [creatingUser, setCreatingUser] = useState(false);

  const [newGroupName, setNewGroupName] = useState("");
  const [creatingGroup, setCreatingGroup] = useState(false);

  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editingGroupName, setEditingGroupName] = useState("");
  const [memberPick, setMemberPick] = useState<Record<string, string>>({});
  const [newGroupPermissions, setNewGroupPermissions] = useState<string[]>(
    () => [...PANEL_PERMISSION_LIST],
  );
  const [groupPermDraft, setGroupPermDraft] = useState<Record<string, string[]>>(
    {},
  );

  const loadAll = useCallback(async () => {
    setError(null);
    const [ur, gr] = await Promise.all([
      fetch(`${API_URL}/team/users`, { headers: getAuthHeaders() }),
      fetch(`${API_URL}/team/groups`, { headers: getAuthHeaders() }),
    ]);
    if (!ur.ok || !gr.ok) {
      setError(t("team.loadError"));
      setLoading(false);
      return;
    }
    setUsers(await ur.json());
    setGroups(await gr.json());
    setLoading(false);
  }, [t]);

  useEffect(() => {
    if (authLoading) return;
    if (!user || user.role !== "ADMIN") {
      setLoading(false);
      return;
    }
    setLoading(true);
    loadAll();
  }, [authLoading, user, loadAll]);

  useEffect(() => {
    if (!user || user.role !== "ADMIN") return;
    const onFocus = () => {
      loadAll();
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [user, loadAll]);

  useEffect(() => {
    const m: Record<string, string[]> = {};
    for (const g of groups) {
      m[g.uuid] = [...(g.permissions ?? [])];
    }
    setGroupPermDraft(m);
  }, [groups]);

  function toggleNewGroupPerm(code: PanelPermissionCode) {
    setNewGroupPermissions((cur) =>
      cur.includes(code) ? cur.filter((c) => c !== code) : [...cur, code],
    );
  }

  function toggleGroupDraftPerm(groupUuid: string, code: PanelPermissionCode) {
    setGroupPermDraft((d) => {
      const cur = d[groupUuid] ?? [];
      const next = cur.includes(code)
        ? cur.filter((c) => c !== code)
        : [...cur, code];
      return { ...d, [groupUuid]: next };
    });
  }

  async function saveGroupPermissions(uuid: string) {
    const perms = groupPermDraft[uuid];
    if (!perms) return;
    const res = await fetch(`${API_URL}/team/groups/${uuid}`, {
      method: "PATCH",
      headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ permissions: perms }),
    });
    if (!res.ok) {
      setError(t("team.loadError"));
      return;
    }
    setError(null);
    await loadAll();
  }

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    setCreatingUser(true);
    try {
      const res = await fetch(`${API_URL}/team/users`, {
        method: "POST",
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newEmail,
          name: newName,
          password: newPassword,
          role: newRole,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Erro");
      setNewEmail("");
      setNewName("");
      setNewPassword("");
      setNewRole("STAFF");
      await loadAll();
    } catch {
      setError(t("team.loadError"));
    } finally {
      setCreatingUser(false);
    }
  }

  async function handleRoleChange(uuid: string, role: "STAFF" | "ADMIN") {
    const res = await fetch(`${API_URL}/team/users/${uuid}`, {
      method: "PATCH",
      headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(
        typeof data.message === "string" ? data.message : t("team.loadError"),
      );
      return;
    }
    setError(null);
    await loadAll();
  }

  async function handleDeleteUser(uuid: string) {
    if (!window.confirm(t("team.confirmDeleteUser"))) return;
    const res = await fetch(`${API_URL}/team/users/${uuid}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(
        typeof data.message === "string" ? data.message : t("team.loadError"),
      );
      return;
    }
    setError(null);
    await loadAll();
  }

  async function handleCreateGroup(e: React.FormEvent) {
    e.preventDefault();
    setCreatingGroup(true);
    try {
      const res = await fetch(`${API_URL}/team/groups`, {
        method: "POST",
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newGroupName,
          permissions: newGroupPermissions,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Erro");
      setNewGroupName("");
      setNewGroupPermissions([...PANEL_PERMISSION_LIST]);
      await loadAll();
    } catch {
      setError(t("team.loadError"));
    } finally {
      setCreatingGroup(false);
    }
  }

  async function saveGroupName(uuid: string) {
    const res = await fetch(`${API_URL}/team/groups/${uuid}`, {
      method: "PATCH",
      headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ name: editingGroupName }),
    });
    if (!res.ok) {
      setError(t("team.loadError"));
      return;
    }
    setEditingGroupId(null);
    await loadAll();
  }

  async function handleDeleteGroup(uuid: string) {
    if (!window.confirm(t("team.confirmDeleteGroup"))) return;
    const res = await fetch(`${API_URL}/team/groups/${uuid}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      setError(t("team.loadError"));
      return;
    }
    await loadAll();
  }

  async function addMember(groupUuid: string, userUuid: string) {
    if (!userUuid) return;
    const res = await fetch(`${API_URL}/team/groups/${groupUuid}/members`, {
      method: "POST",
      headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
      body: JSON.stringify({ userUuid }),
    });
    if (!res.ok) {
      setError(t("team.loadError"));
      return;
    }
    setMemberPick((p) => ({ ...p, [groupUuid]: "" }));
    await loadAll();
  }

  async function removeMember(groupUuid: string, userUuid: string) {
    const res = await fetch(
      `${API_URL}/team/groups/${groupUuid}/members/${userUuid}`,
      { method: "DELETE", headers: getAuthHeaders() },
    );
    if (!res.ok) {
      setError(t("team.loadError"));
      return;
    }
    await loadAll();
  }

  if (authLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return (
    <div id="team-settings" className="space-y-6 scroll-mt-24">
      <div>
        <h2 className="text-lg font-semibold text-zinc-800">
          {t("team.title")}
        </h2>
        <p className="text-sm text-zinc-500 mt-1">{t("team.subtitle")}</p>
      </div>

      {error ? (
        <div
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-zinc-800 mb-4">
              {t("team.usersTitle")}
            </h3>

            <form
              onSubmit={handleCreateUser}
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6 pb-6 border-b border-zinc-100"
            >
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1">
                  {t("team.email")}
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1">
                  {t("team.name")}
                </label>
                <input
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1">
                  {t("team.password")}
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1">
                  {t("team.role")}
                </label>
                <select
                  value={newRole}
                  onChange={(e) =>
                    setNewRole(e.target.value as "STAFF" | "ADMIN")
                  }
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
                >
                  <option value="STAFF">{t("team.roleStaff")}</option>
                  <option value="ADMIN">{t("team.roleAdmin")}</option>
                </select>
              </div>
              <div className="sm:col-span-2 lg:col-span-4">
                <button
                  type="submit"
                  disabled={creatingUser}
                  className="rounded-lg bg-zinc-900 text-white px-4 py-2 text-sm font-medium disabled:opacity-50"
                >
                  {creatingUser ? t("team.creating") : t("team.createUser")}
                </button>
              </div>
            </form>

            <ul className="space-y-3">
              {users.map((u) => (
                <li
                  key={u.uuid}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-zinc-100 bg-zinc-50/80 px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-zinc-800">
                      {u.name}
                      {u.uuid === user.uuid ? (
                        <span className="ml-2 text-xs font-normal text-zinc-500">
                          ({t("team.you")})
                        </span>
                      ) : null}
                    </p>
                    <p className="text-sm text-zinc-500">{u.email}</p>
                    <p className="text-xs text-zinc-400 mt-1">
                      {t("team.groups")}:{" "}
                      {u.groups.length
                        ? u.groups.map((g) => g.name).join(", ")
                        : "—"}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={u.role}
                      onChange={(e) =>
                        handleRoleChange(
                          u.uuid,
                          e.target.value as "STAFF" | "ADMIN",
                        )
                      }
                      className="rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-sm"
                    >
                      <option value="STAFF">{t("team.roleStaff")}</option>
                      <option value="ADMIN">{t("team.roleAdmin")}</option>
                    </select>
                    {u.uuid !== user.uuid ? (
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(u.uuid)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        {t("team.deleteUser")}
                      </button>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-zinc-800 mb-4">
              {t("team.groupsTitle")}
            </h3>

            <form
              onSubmit={handleCreateGroup}
              className="space-y-4 mb-6 pb-6 border-b border-zinc-100"
            >
              <p className="text-xs text-zinc-500">{t("team.newGroupAccessHint")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PANEL_PERMISSION_LIST.map((code) => (
                  <label
                    key={code}
                    className="flex items-center gap-2 text-sm text-zinc-700 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={newGroupPermissions.includes(code)}
                      onChange={() => toggleNewGroupPerm(code)}
                      className="rounded border-zinc-300"
                    />
                    {t(`team.perm.${code}`)}
                  </label>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 items-end">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-xs font-medium text-zinc-600 mb-1">
                    {t("team.groupName")}
                  </label>
                  <input
                    required
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={creatingGroup}
                  className="rounded-lg bg-zinc-900 text-white px-4 py-2 text-sm font-medium disabled:opacity-50 h-[38px]"
                >
                  {creatingGroup
                    ? t("team.creatingGroup")
                    : t("team.createGroup")}
                </button>
              </div>
            </form>

            {groups.length === 0 ? (
              <p className="text-sm text-zinc-500">{t("team.noGroups")}</p>
            ) : (
              <ul className="space-y-4">
                {groups.map((g) => (
                  <li
                    key={g.uuid}
                    className="rounded-xl border border-zinc-100 p-4 bg-zinc-50/50"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      {editingGroupId === g.uuid ? (
                        <div className="flex flex-wrap gap-2 items-center">
                          <input
                            value={editingGroupName}
                            onChange={(e) =>
                              setEditingGroupName(e.target.value)
                            }
                            className="rounded-lg border border-zinc-200 px-2 py-1 text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => saveGroupName(g.uuid)}
                            className="text-sm text-zinc-700 underline"
                          >
                            {t("team.saveGroup")}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingGroupId(null)}
                            className="text-sm text-zinc-500"
                          >
                            {t("common.cancel")}
                          </button>
                        </div>
                      ) : (
                        <h4 className="font-semibold text-zinc-800">
                          {g.name}
                        </h4>
                      )}
                      <div className="flex gap-2">
                        {editingGroupId !== g.uuid ? (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingGroupId(g.uuid);
                              setEditingGroupName(g.name);
                            }}
                            className="text-sm text-zinc-600 hover:underline"
                          >
                            {t("common.edit")}
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => handleDeleteGroup(g.uuid)}
                          className="text-sm text-red-600 hover:underline"
                        >
                          {t("team.deleteGroup")}
                        </button>
                      </div>
                    </div>

                    <div className="mb-4 rounded-lg border border-zinc-200 bg-white/60 p-3">
                      <p className="text-xs font-medium text-zinc-600 mb-2">
                        {t("team.accessTitle")}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                        {PANEL_PERMISSION_LIST.map((code) => (
                          <label
                            key={code}
                            className="flex items-center gap-2 text-sm text-zinc-700 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={(groupPermDraft[g.uuid] ?? []).includes(
                                code,
                              )}
                              onChange={() => toggleGroupDraftPerm(g.uuid, code)}
                              className="rounded border-zinc-300"
                            />
                            {t(`team.perm.${code}`)}
                          </label>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => saveGroupPermissions(g.uuid)}
                        className="rounded-lg border border-zinc-800 bg-zinc-900 text-white px-3 py-1.5 text-sm"
                      >
                        {t("team.savePermissions")}
                      </button>
                    </div>

                    <p className="text-xs font-medium text-zinc-600 mb-2">
                      {t("team.members")}
                    </p>
                    <ul className="space-y-1 mb-3">
                      {g.users.map((m) => (
                        <li
                          key={m.uuid}
                          className="flex justify-between items-center text-sm text-zinc-700"
                        >
                          <span>
                            {m.name} ({m.email})
                          </span>
                          <button
                            type="button"
                            onClick={() => removeMember(g.uuid, m.uuid)}
                            className="text-xs text-red-600 hover:underline"
                          >
                            {t("team.removeMember")}
                          </button>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 items-center">
                      <select
                        value={memberPick[g.uuid] || ""}
                        onChange={(e) =>
                          setMemberPick((p) => ({
                            ...p,
                            [g.uuid]: e.target.value,
                          }))
                        }
                        className="rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-sm flex-1 min-w-[180px]"
                      >
                        <option value="">{t("team.selectUser")}</option>
                        {users
                          .filter(
                            (u) => !g.users.some((m) => m.uuid === u.uuid),
                          )
                          .map((u) => (
                            <option key={u.uuid} value={u.uuid}>
                              {u.name} — {u.email}
                            </option>
                          ))}
                      </select>
                      <button
                        type="button"
                        onClick={() =>
                          addMember(g.uuid, memberPick[g.uuid] || "")
                        }
                        disabled={!memberPick[g.uuid]}
                        className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm disabled:opacity-40"
                      >
                        {t("team.addMember")}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
