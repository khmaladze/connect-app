declare module "bcryptjs" {
  export function genSaltSync(rounds?: number): string;
  export function genSalt(
    rounds: number,
    callback?: (err: Error, salt: string) => void
  ): void;

  export function hashSync(data: string, salt: string): string;
  export function hash(
    data: string,
    saltOrRounds: string | number,
    callback?: (err: Error, encrypted: string) => void
  ): void;

  export function compareSync(data: string, encrypted: string): boolean;
  export function compare(
    data: string,
    encrypted: string,
    callback?: (err: Error, same: boolean) => void
  ): void;
}
