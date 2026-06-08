import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    hasSession() {
        if (typeof window === 'undefined') return false;

        try {
            const cookieFallback = window.localStorage.getItem('cookieFallback');
            if (!cookieFallback) return false;

            const cookies = JSON.parse(cookieFallback);
            return Boolean(cookies[`a_session_${conf.appwriteProjectId}`]);
        } catch {
            return false;
        }
    }

    async getCurrentUser() {
        if (!this.hasSession()) {
            return null;
        }

        try {
            return await this.account.get();
        } catch (error) {
            if (error?.code !== 401) {
                console.log("Appwrite serive :: getCurrentUser :: error", error);
            }
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService

