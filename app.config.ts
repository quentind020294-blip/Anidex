import type { ConfigContext, ExpoConfig } from 'expo/config';

// Sur GitHub Pages, le site est servi sous https://<utilisateur>.github.io/<dépôt>/.
// Le workflow de déploiement définit EXPO_PUBLIC_BASE_URL=/<dépôt> ; en local, il reste vide.
const baseUrl = process.env.EXPO_PUBLIC_BASE_URL ?? '';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...(config as ExpoConfig),
  experiments: { ...config.experiments, baseUrl },
});
