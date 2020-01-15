import { createHash, randomBytes } from 'crypto';
import { promisify } from 'util';

const pRandomBytes = promisify(randomBytes);

export { hash, verify } from 'argon2';

export const generateRandomToken = async () => createHash('sha1')
  .update(await pRandomBytes(256))
  .digest('hex');
