-- Allow anonymous (guest) checkout without requiring auth session
-- Customers: allow insert when auth_user_id is null (anonymous guest)
create policy "anon customer insert"
  on customers for insert
  with check (auth_user_id is null and auth.uid() is null);

-- Orders: allow insert when linked to an anonymous customer
create policy "anon order insert"
  on orders for insert
  with check (
    customer_id in (
      select id from customers where auth_user_id is null
    )
  );
