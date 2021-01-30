import bcrypt from 'bcrypt';

export const generateHash = async (password: string) => {
    try {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (e) {
        throw e;
    }
}

export const compareHash = async (password: string, hash: string) => {
    try {
        const comparison = await bcrypt.compare(password, hash);
        return comparison;
    } catch (e) {
        throw e;
    }
}