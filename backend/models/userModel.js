import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: { type: String,
                 required: true, 
                 unique: true 
            },
    email: { type: String,
             required: true,
              unique: true 
            },
    password: { type: String,
                required: true 
            },
    mangas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Manga' }],

    lastLogin: {
        type: Date,
        default: Date.now,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    },
    {
    timestamps: true,
    });

export const User = mongoose.model('User', userSchema);