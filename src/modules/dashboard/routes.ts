export default [
    {
        path: "/",
        name: "Dashboard",
        meta: {
            layout: "default",
        },
        component: () => import("@/modules/dashboard/pages/PDashboard.vue"),
    },
];
