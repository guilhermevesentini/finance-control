import { LoadingOptionsResolved } from 'element-plus';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $globalLoading: (options?: Partial<LoadingOptionsResolved>) => ReturnType<typeof import('element-plus').ElLoading.service>;
  }
}

export {};