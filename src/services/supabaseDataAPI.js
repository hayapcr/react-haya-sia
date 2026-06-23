import { supabase } from "../lib/supabaseClient";

const assertClient = () => {
  if (!supabase) {
    throw new Error("Supabase belum dikonfigurasi. Isi file .env terlebih dahulu.");
  }
};

export const tierDiscounts = {
  Bronze: 0.05,
  Silver: 0.1,
  Gold: 0.15,
  Platinum: 0.2,
};

export function calculateTier(points = 0) {
  if (points > 3000) return "Platinum";
  if (points >= 1501) return "Gold";
  if (points >= 501) return "Silver";
  return "Bronze";
}

export function calculateOrderTotals(totalOriginalPrice, tier = "Bronze") {
  const discountApplied = tierDiscounts[tier] || 0;
  const totalFinalPrice = Math.max(
    Number(totalOriginalPrice) - Number(totalOriginalPrice) * discountApplied,
    0
  );

  return {
    discountApplied,
    totalFinalPrice,
    pointsEarned: Math.floor(totalFinalPrice / 10000),
  };
}

export const productsAPI = {
  async fetchProductById(id) {
    assertClient();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async fetchProducts() {
    assertClient();

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async createProduct(payload) {
    assertClient();

    const { data, error } = await supabase
      .from("products")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateProduct(id, payload) {
    assertClient();

    const { data, error } = await supabase
      .from("products")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteProduct(id) {
    assertClient();

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
  },
};

export const profilesAPI = {
  async fetchProfiles() {
    assertClient();

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async updateProfile(id, payload) {
    assertClient();

    const { data, error } = await supabase
      .from("profiles")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteProfile(id) {
    assertClient();

    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (error) throw error;
  },
};

export const customersAPI = {
  async fetchCustomers() {
    assertClient();

    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async fetchCustomerById(id) {
    assertClient();

    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async createCustomer(payload) {
    assertClient();

    const { data, error } = await supabase
      .from("customers")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateCustomer(id, payload) {
    assertClient();

    const { data, error } = await supabase
      .from("customers")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteCustomer(id) {
    assertClient();

    const { error } = await supabase.from("customers").delete().eq("id", id);
    if (error) throw error;
  },
};

export const ordersAPI = {
  async fetchOrders(role, userId) {
    assertClient();

    let query = supabase
      .from("orders")
      .select("*, profiles(full_name, email)")
      .order("created_at", { ascending: false });

    if (role !== "admin") {
      query = query.eq("user_id", userId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  },

  async createOrder({ userId, totalOriginalPrice, tier, status = "pending" }) {
    assertClient();

    const totals = calculateOrderTotals(totalOriginalPrice, tier);

    const { data, error } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        total_original_price: Number(totalOriginalPrice),
        discount_applied: totals.discountApplied,
        total_final_price: totals.totalFinalPrice,
        points_earned: totals.pointsEarned,
        status,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateOrder(id, payload) {
    assertClient();

    const { data, error } = await supabase
      .from("orders")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteOrder(id) {
    assertClient();

    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) throw error;
  },
};
