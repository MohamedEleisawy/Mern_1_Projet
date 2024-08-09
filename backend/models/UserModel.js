import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,  // Correction ici
        unique: true 
    },
    password: {
        type: String,
        required: true  // Correction ici
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User;
