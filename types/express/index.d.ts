import type { userLocalData } from "../../src/app/utils/token/token.types.ts";


declare global{ namespace Express {
    interface Request {
        user: userLocalData;
    }
}
}