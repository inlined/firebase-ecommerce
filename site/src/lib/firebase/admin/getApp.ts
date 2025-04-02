import { App, initializeApp, getApp as getExistingApp } from "firebase-admin/app";

export default function getApp(): App {
    try {
        return getExistingApp();
    } catch {
        return initializeApp();
    }
}