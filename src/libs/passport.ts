import { ExtractJwt, Strategy as JwtStrategy, Strategy } from "passport-jwt";
import { findUserById } from "../features/users/user.service";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}

export const strategy = new JwtStrategy(options, async (payload, done) => {
    try {
        const user = await findUserById(payload.id);

        if(user) {
            return done(null, user)
        } else {
            return done(null, false);
        }
    } catch (err) {
        console.log("Strategy error:", err)
        return done(err, false);
    }
})

