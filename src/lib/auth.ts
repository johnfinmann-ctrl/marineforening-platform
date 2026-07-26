import { supabase } from './supabaseClient';

export type Role =
  | 'member'
  | 'volunteer_coordinator'
  | 'editor'
  | 'treasurer'
  | 'board_member'
  | 'admin';

/**
 * Henter rollerne for den aktuelt indloggede bruger.
 * En bruger kan have flere roller samtidig (se docs/product-design-document.md, afsnit 4.1).
 */
export async function getCurrentRoles(): Promise<Role[]> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return [];

  const { data, error } = await supabase
    .from('user_roles')
    .select('role, members!inner(auth_user_id)')
    .eq('members.auth_user_id', userData.user.id);

  if (error || !data) return [];
  return data.map((row) => row.role as Role);
}

export function hasRole(roles: Role[], role: Role): boolean {
  return roles.includes(role) || roles.includes('admin');
}
