-- Financeiro no dashboard e valores em atendimento (pedidos/comandas)
UPDATE "UserGroup"
SET "permissions" = "permissions" || ARRAY['DASHBOARD_FINANCE']::TEXT[]
WHERE 'DASHBOARD' = ANY("permissions")
  AND NOT ('DASHBOARD_FINANCE' = ANY("permissions"));

UPDATE "UserGroup"
SET "permissions" = "permissions" || ARRAY['ATTENDANCE_FINANCE']::TEXT[]
WHERE (
    'ORDERS' = ANY("permissions")
    OR 'TABS' = ANY("permissions")
  )
  AND NOT ('ATTENDANCE_FINANCE' = ANY("permissions"));
