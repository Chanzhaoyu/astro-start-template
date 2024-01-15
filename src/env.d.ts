/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly JWT_SECRET_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    auth?: boolean;
  }
}

interface Window {}
