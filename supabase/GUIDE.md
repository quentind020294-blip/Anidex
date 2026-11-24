# Activer le système d’amis (Supabase) depuis ton téléphone

Durée : environ 15 minutes. Tout se fait dans le navigateur du téléphone (Chrome sur Android).
L’offre gratuite de Supabase suffit largement.

> 🔐 **Règle d’or** : l’appli n’a besoin que de deux valeurs **publiques**, l’**URL du projet** et la **clé publique** (*publishable key*, qui commence par `sb_publishable_`).
> Ne copie **jamais** la clé **secrète** (`sb_secret_…`, ou l’ancienne `service_role`) : ne la colle nulle part, ni dans GitHub, ni dans une conversation.
> Si elle se retrouvait par erreur dans l’appli, le déploiement serait bloqué automatiquement.

---

## Étape 1 : créer un compte Supabase

1. Ouvre **https://supabase.com** et touche **Start your project**.
2. Choisis **Continue with GitHub** (le plus simple, tu as déjà un compte GitHub) et accepte.

## Étape 2 : créer le projet

1. Si on te le demande, crée une **organisation** (nom libre, plan **Free**).
2. Touche **New project** et remplis :
   - **Name** : `anidex`
   - **Database Password** : touche **Generate a password** et enregistre-le dans ton gestionnaire de mots de passe. L’appli n’en a pas besoin, mais garde-le.
   - **Region** : **Asia-Pacific (Sydney)**, la plus proche de l’Australie.
3. Touche **Create new project** et attends 1 à 2 minutes que le projet soit prêt.

## Étape 3 : autoriser les comptes sans e-mail

L’Anidex crée des comptes avec un simple pseudo, sans e-mail (« connexions anonymes » dans Supabase).

1. Ouvre le menu (☰ en haut à gauche), puis **Authentication**.
2. Va dans **Sign In / Providers**.
3. Active **Allow anonymous sign-ins** (ou **Anonymous sign-ins**), puis **Save** si le bouton apparaît.

## Étape 4 : créer les tables et les règles de sécurité

1. Sur GitHub, ouvre le fichier `supabase/anidex.sql` du dépôt (branche `main`, une fois la pull request fusionnée), puis touche **Raw** pour afficher le texte brut.
2. Sélectionne tout le texte et copie-le (appui long → **Tout sélectionner** → **Copier**).
3. Dans Supabase : menu ☰ → **SQL Editor** → **New query** (ou **+**).
4. Colle le texte et touche **Run**.
5. Si Supabase affiche un avertissement sur des « destructive operations », c’est normal (le script remplace ses propres règles s’il est relancé) : confirme avec **Run this query**.
6. Le résultat attendu est **Success. No rows returned**.

> 💡 Sur un petit écran, copier un long fichier n’est pas toujours facile. Si le collage est tronqué, Supabase affichera une erreur de syntaxe : recommence la copie, ou fais cette étape depuis un ordinateur.

## Étape 5 : récupérer l’URL et la clé publique

1. En haut de la page du projet, touche le bouton **Connect**.
2. Note les deux valeurs affichées :
   - **Project URL**, du type `https://abcdefghijklmnop.supabase.co`
   - **Publishable key**, du type `sb_publishable_…`
3. Si tu ne trouves pas **Connect** : menu ☰ → **Project Settings** → **API Keys**. La clé publique est dans la section **Publishable key**. Si aucune n’existe, touche **Create new API keys**.
4. ⚠️ Ne copie pas ce qui est dans **Secret keys**.

## Étape 6 : donner ces deux valeurs au site (GitHub)

1. Sur GitHub, ouvre le dépôt **Anidex** → **Settings** (sur mobile : le menu ⋯ ou « Settings » dans l’onglet du dépôt).
2. Va dans **Secrets and variables** → **Actions**, puis l’onglet **Variables** (pas « Secrets » : ces valeurs sont publiques).
3. Touche **New repository variable** et crée :
   - Nom `SUPABASE_URL`, valeur : l’URL du projet ;
   - Nom `SUPABASE_PUBLISHABLE_KEY`, valeur : la clé `sb_publishable_…`.

## Étape 7 : republier le site

1. Sur GitHub : onglet **Actions** → **Déployer sur GitHub Pages** → **Run workflow** → **Run workflow**.
2. Attends que la coche devienne verte (environ 2 minutes).
3. Ouvre l’Anidex : un nouvel onglet **Amis** permet de créer ton compte avec un pseudo.

---

## Bon à savoir

- **Gratuit** : sur l’offre gratuite, Supabase met un projet **en pause après environ une semaine sans activité**. L’appli continue de fonctionner, mais sans les amis. Pour réactiver le projet, ouvre-le dans Supabase et touche **Restore project**.
- **Ce que voient tes amis** : ton pseudo, ton niveau, tes XP, tes badges, les espèces découvertes et tes observations, avec l’**espèce, la date et l’État** seulement. **Jamais** ta position GPS ni le lieu précis. Pour les **espèces menacées**, aucun lieu n’est partagé, même pas l’État ; c’est appliqué à la fois dans l’appli et dans la base.
- **Sécurité** : toutes les tables sont protégées par des règles RLS. Chacun ne peut modifier que ses propres données et ne peut lire que les siennes et celles de ses amis. Une personne non connectée n’a accès à rien. Ces règles sont testées : voir `supabase/tests/`.
- **Compte sans e-mail** : il est lié à l’appareil. Si tu désinstalles l’appli ou effaces ses données, tu ne pourras pas le récupérer (tes observations locales sont aussi effacées dans ce cas). Tu peux supprimer ton compte en ligne à tout moment depuis l’onglet Amis.
- **Sans compte ou hors connexion**, l’Anidex fonctionne exactement comme avant.
