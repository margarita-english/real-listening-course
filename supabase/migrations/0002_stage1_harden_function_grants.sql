-- Lock down SECURITY DEFINER helper functions so they can't be called
-- directly via the public REST API by anonymous/standard users.

-- handle_new_user is only ever run by the auth trigger, never called directly.
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- is_teacher is used inside RLS policies, so signed-in users need it,
-- but anonymous visitors do not.
revoke execute on function public.is_teacher() from public, anon;
grant execute on function public.is_teacher() to authenticated;
