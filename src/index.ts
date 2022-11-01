const has = (object: any, path: string) => {
  return object != null && Object.prototype.hasOwnProperty.call(object, path);
};

const trim = (string: string, chars: string) => {
  return string.replace(new RegExp(`^${chars}+|${chars}+$`, "g"), "");
};

const env = (key: string, defaultValue?: string): string | undefined => {
  return has(process.env, key) ? process.env[key] : defaultValue;
};

const int = (key: string, defaultValue: number, radix: number = 10) => {
  if (!has(process.env, key)) {
    return defaultValue;
  }

  const value = process.env[key] ?? "";
  return parseInt(value, radix);
};

const string = (key: string, defaultValue: string): string => {
  if (!has(process.env, key)) {
    return defaultValue;
  }
  return process.env[key] as string;
};

const float = (key: string, defaultValue: number): number => {
  if (!has(process.env, key)) {
    return defaultValue;
  }

  const value = process.env[key] ?? "";
  return parseFloat(value);
};

const bool = (key: string, defaultValue: boolean): boolean => {
  if (!has(process.env, key)) {
    return defaultValue;
  }

  const value = process.env[key];
  return value === "true";
};

const json = (key: string, defaultValue: any): object => {
  if (!has(process.env, key)) {
    return defaultValue;
  }

  const value = process.env[key] ?? "";
  try {
    return JSON.parse(value);
  } catch (error: any) {
    return defaultValue;
  }
};

const array = (key: string, defaultValue: any[]): Array<any> => {
  if (!has(process.env, key)) {
    return defaultValue;
  }

  let value = process.env[key] ?? "";

  if (value.startsWith("[") && value.endsWith("]")) {
    value = value.substring(1, value.length - 1);
  }

  return value.split(",").map((v) => {
    return trim(trim(v, " "), '"');
  });
};

const csv = (key: string, defaultValue: any[]): Array<any> => {
  //parse a csv string into an array
  if (!has(process.env, key)) {
    return defaultValue;
  }

  let value = process.env[key] ?? "";

  return value.split(",");
};

const date = (key: string, defaultValue: Date): Date => {
  if (!has(process.env, key)) {
    return defaultValue;
  }

  const value = process.env[key] as string;
  return new Date(value);
};

export default { env, int, string, float, bool, json, array, csv, date };
