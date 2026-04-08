<script setup lang="ts">
import { computed, ref } from "vue";
import { Card, PageHeader } from "@/lib/mitreka-ui-dist/vue";
import TimeOffBalancesTab from "@/pages/HRISAdmin/components/TimeOffBalancesTab.vue";
import TimeOffPoliciesTab from "@/pages/HRISAdmin/components/TimeOffPoliciesTab.vue";
import TimeOffRequestsTab from "@/pages/HRISAdmin/components/TimeOffRequestsTab.vue";
import { timeOffBalances, timeOffPolicies, timeOffRequests, type TimeOffBalanceRecord, type TimeOffPolicyRecord } from "@/data/hrisAdmin/timeOff";

type TimeOffTab = "requests" | "policies" | "balances";

const activeTab = ref<TimeOffTab>("requests");
const policies = ref<TimeOffPolicyRecord[]>([...timeOffPolicies]);
const balances = ref<TimeOffBalanceRecord[]>([...timeOffBalances]);

const tabItems = [
  { key: "requests" as const, label: "Requests", description: "Inbox approval dan review pengajuan karyawan." },
  { key: "policies" as const, label: "Policies", description: "Master jenis cuti/izin dan assignment policy." },
  { key: "balances" as const, label: "Balances", description: "Quota per employee, termasuk override manual." },
];

const heroStats = computed(() => [
  { label: "Awaiting approval", value: timeOffRequests.filter((item) => item.status === "awaiting_approval").length, tone: "text-warning" },
  { label: "Active policies", value: policies.value.filter((item) => item.status === "active").length, tone: "text-primary" },
  { label: "Manual overrides", value: balances.value.filter((item) => item.source === "manual_override").length, tone: "text-info" },
]);

const handleCreatePolicy = (policy: TimeOffPolicyRecord) => {
  policies.value = [policy, ...policies.value];
  activeTab.value = "policies";
};

const handleUpdatePolicy = (policy: TimeOffPolicyRecord) => {
  policies.value = policies.value.map((item) => (item.id === policy.id ? policy : item));
};

const handleDeletePolicy = (policyId: string) => {
  policies.value = policies.value.filter((item) => item.id !== policyId);
};

const handleActivatePolicy = (policyId: string) => {
  policies.value = policies.value.map((item) => (item.id === policyId ? { ...item, status: "active" } : item));
};

const handleUpdateBalance = (balance: TimeOffBalanceRecord) => {
  balances.value = balances.value.map((item) => (item.id === balance.id ? balance : item));
};

const handleResetBalance = (balanceId: string) => {
  balances.value = balances.value.map((item) =>
    item.id === balanceId
      ? {
          ...item,
          entitled: item.policyId === "policy-ctu" ? 12 : item.policyId === "policy-sts" ? 2 : 0,
          remaining: Math.max((item.policyId === "policy-ctu" ? 12 : item.policyId === "policy-sts" ? 2 : 0) - item.used, 0),
          source: "rule",
        }
      : item,
  );
};
</script>

<template>
  <div class="flex flex-1 flex-col gap-4">
    <PageHeader
      category="Mockup"
      title="Cuti dan Izin"
      description="Sandbox modul time off untuk request approval, policy setup, dan employee balance dalam satu area HRIS Admin."
    />

    <Card padding="p-4" class="space-y-4">
      <div class="grid gap-3 md:grid-cols-3">
        <div
          v-for="item in heroStats"
          :key="item.label"
          class="rounded-xl border border-base-300 bg-base-50 p-4"
        >
          <div class="text-sm text-base-content/65">{{ item.label }}</div>
          <div class="mt-2 text-2xl font-semibold" :class="item.tone">{{ item.value }}</div>
        </div>
      </div>
    </Card>

    <Card padding="p-4">
      <div class="tabs tabs-pills flex-wrap">
        <button
          v-for="item in tabItems"
          :key="item.key"
          type="button"
          class="tab h-auto min-h-[unset] min-w-[220px] justify-start px-4 py-3"
          :class="{ 'tab-active': activeTab === item.key }"
          @click="activeTab = item.key"
        >
          <div class="text-left">
            <div class="font-semibold">{{ item.label }}</div>
            <div class="mt-1 text-xs text-base-content/65">{{ item.description }}</div>
          </div>
        </button>
      </div>
    </Card>

    <TimeOffRequestsTab v-if="activeTab === 'requests'" :requests="timeOffRequests" />
    <TimeOffPoliciesTab
      v-else-if="activeTab === 'policies'"
      :policies="policies"
      @create-policy="handleCreatePolicy"
      @update-policy="handleUpdatePolicy"
      @delete-policy="handleDeletePolicy"
      @activate-policy="handleActivatePolicy"
    />
    <TimeOffBalancesTab
      v-else
      :balances="balances"
      :policies="policies"
      @update-balance="handleUpdateBalance"
      @reset-balance="handleResetBalance"
    />
  </div>
</template>
