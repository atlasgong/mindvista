import type { FieldAccess, Access } from "payload";
import type { User } from "@/payload-types";

export const denyAccess: Access = () => {
    return false;
};

export const isAdmin: FieldAccess = ({ req }) => {
    const user = req.user as User | null;
    return user?.role === "admin";
};

export const isContentEditor: FieldAccess = ({ req }) => {
    const user = req.user as User | null;
    return user?.role === "contentEditor";
};

export const isContentEditorFr: FieldAccess = ({ req }) => {
    const user = req.user as User | null;
    return user?.role === "contentEditorFr";
};

// PERMISSIONS START BELOW ------------

export const denyFieldAccess: FieldAccess = () => {
    return false;
};

// only admin and contentEditor can edit content
export const canEditContent: FieldAccess = ({ req }) => {
    const user = req.user as User | null;
    if (!user) return false;
    return user.role === "admin" || user.role === "contentEditor";
};

// only admin and contentEditorFr can edit French content
export const canEditFrenchContent: FieldAccess = ({ req }) => {
    const user = req.user as User | null;
    if (!user) return false;
    return user.role === "admin" || user.role === "contentEditorFr";
};
