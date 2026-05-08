/**
 * Supabase database types — generated from Phase 2 schema.
 * Regenerate after schema changes: pnpm supabase gen types typescript --local > types/db.ts
 */
export type Json = string | number | boolean | null | { [k: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          auth_user_id: string;
          role: string;
          created_at: string;
        };
        Insert: {
          auth_user_id: string;
          role?: string;
          created_at?: string;
        };
        Update: {
          auth_user_id?: string;
          role?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          id: string;
          slug: string;
          name_he: string;
          sort_order: number;
        };
        Insert: {
          id?: string;
          slug: string;
          name_he: string;
          sort_order?: number;
        };
        Update: {
          id?: string;
          slug?: string;
          name_he?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      customers: {
        Row: {
          id: string;
          auth_user_id: string | null;
          name: string | null;
          phone: string | null;
          email: string | null;
          default_address: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          auth_user_id?: string | null;
          name?: string | null;
          phone?: string | null;
          email?: string | null;
          default_address?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          auth_user_id?: string | null;
          name?: string | null;
          phone?: string | null;
          email?: string | null;
          default_address?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      kayak_orders: {
        Row: {
          id: string;
          customer_id: string | null;
          size_id: string | null;
          fruits: string[];
          extras: string[];
          event_type: string | null;
          event_date: string | null;
          guests: number | null;
          delivery_address: string | null;
          notes: string | null;
          status: 'pending' | 'approved' | 'in_prep' | 'ready' | 'delivered' | 'cancelled';
          total_cents: number | null;
          stripe_payment_intent: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id?: string | null;
          size_id?: string | null;
          fruits?: string[];
          extras?: string[];
          event_type?: string | null;
          event_date?: string | null;
          guests?: number | null;
          delivery_address?: string | null;
          notes?: string | null;
          status?: 'pending' | 'approved' | 'in_prep' | 'ready' | 'delivered' | 'cancelled';
          total_cents?: number | null;
          stripe_payment_intent?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string | null;
          size_id?: string | null;
          fruits?: string[];
          extras?: string[];
          event_type?: string | null;
          event_date?: string | null;
          guests?: number | null;
          delivery_address?: string | null;
          notes?: string | null;
          status?: 'pending' | 'approved' | 'in_prep' | 'ready' | 'delivered' | 'cancelled';
          total_cents?: number | null;
          stripe_payment_intent?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      kayak_sizes: {
        Row: {
          id: string;
          label: string;
          guests: string;
          price_cents: number;
        };
        Insert: {
          id: string;
          label: string;
          guests: string;
          price_cents: number;
        };
        Update: {
          id?: string;
          label?: string;
          guests?: string;
          price_cents?: number;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          customer_id: string | null;
          items: Json;
          subtotal_cents: number;
          delivery_cents: number;
          total_cents: number;
          status: 'pending' | 'paid' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
          stripe_payment_intent: string | null;
          delivery_date: string | null;
          delivery_address: string | null;
          delivery_window: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id?: string | null;
          items?: Json;
          subtotal_cents: number;
          delivery_cents?: number;
          total_cents: number;
          status?: 'pending' | 'paid' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
          stripe_payment_intent?: string | null;
          delivery_date?: string | null;
          delivery_address?: string | null;
          delivery_window?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string | null;
          items?: Json;
          subtotal_cents?: number;
          delivery_cents?: number;
          total_cents?: number;
          status?: 'pending' | 'paid' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
          stripe_payment_intent?: string | null;
          delivery_date?: string | null;
          delivery_address?: string | null;
          delivery_window?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          url: string;
          alt: string | null;
          sort_order: number;
        };
        Insert: {
          id?: string;
          product_id: string;
          url: string;
          alt?: string | null;
          sort_order?: number;
        };
        Update: {
          id?: string;
          product_id?: string;
          url?: string;
          alt?: string | null;
          sort_order?: number;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          slug: string;
          name_he: string;
          name_en: string | null;
          category_id: string | null;
          kind: string;
          price_cents: number;
          weight: string;
          description_he: string | null;
          description_en: string | null;
          rating: number | null;
          reviews_count: number;
          tag: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name_he: string;
          name_en?: string | null;
          category_id?: string | null;
          kind: string;
          price_cents: number;
          weight: string;
          description_he?: string | null;
          description_en?: string | null;
          rating?: number | null;
          reviews_count?: number;
          tag?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name_he?: string;
          name_en?: string | null;
          category_id?: string | null;
          kind?: string;
          price_cents?: number;
          weight?: string;
          description_he?: string | null;
          description_en?: string | null;
          rating?: number | null;
          reviews_count?: number;
          tag?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          customer_id: string | null;
          rating: number;
          body_he: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          customer_id?: string | null;
          rating: number;
          body_he?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          customer_id?: string | null;
          rating?: number;
          body_he?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
};

// ─── Convenience row types ─────────────────────────────────────────────────────
type Tables = Database['public']['Tables'];

export type Category = Tables['categories']['Row'];
export type Product = Tables['products']['Row'];
export type ProductImage = Tables['product_images']['Row'];
export type Customer = Tables['customers']['Row'];
export type Order = Tables['orders']['Row'];
export type Review = Tables['reviews']['Row'];
export type KayakSize = Tables['kayak_sizes']['Row'];
export type KayakOrder = Tables['kayak_orders']['Row'];
export type AdminUser = Tables['admin_users']['Row'];

// Order item shape stored in orders.items jsonb
export type OrderItem = {
  product_id: string;
  qty: number;
  price_cents: number;
  name_he: string;
  weight: string;
  kind: string;
};
