import {toast} from "vue-sonner"
import {BaseToast} from "@/components/Base";
import {markRaw} from "vue";

export const useCustomToast = () => {
    const showToast = (
        title: string,
        type: "success" | "error" | "warning" | "info"
    ) => {
        const id = 'toast-id--' + Math.random().toString(36).substr(2, 9);

        toast.custom(markRaw(BaseToast), {
            id: id,
            componentProps: {title, type, id},
        })

        return id;
    };

    const dismissToast = (id: string) => {
        toast.dismiss(id)
    };

    return {showToast, dismissToast};
};
