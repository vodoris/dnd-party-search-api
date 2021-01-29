import bcrypt from 'bcrypt';
import e from 'express';

export const generateHash = async (password: string) => {
    try {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (e) {
        console.error(e);
        throw e;
    }
}