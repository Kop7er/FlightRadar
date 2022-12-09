import * as crypto from "crypto";

function generateAPIKey() {

    return crypto.randomBytes(16).toString("hex");

}

export default generateAPIKey;