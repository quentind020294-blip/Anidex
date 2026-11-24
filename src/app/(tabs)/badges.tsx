import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radius } from '../../components/theme';
import { Button, Card, ProgressBar } from '../../components/ui';
import { ANIMALS } from '../../data/animals';
import { CATEGORIES, CATEGORY_ORDER, RARITIES, RARITY_ORDER } from '../../data/meta';
import { useI18n } from '../../i18n';
import { BADGES, rankName } from '../../lib/progress';
import { useDex } from '../../lib/store';

export default function BadgesScreen() {
  const { progress, sightings, unlockedBadges } = useDex();
  const { s } = useI18n();
  const { xp, level, levelStartXp, nextLevelXp } = progress;
  const levelPct = nextLevelXp ? (xp - levelStartXp) / (nextLevelXp - levelStartXp) : 1;

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.rankCard}>
        <View style={styles.levelBubble}>
          <Text style={styles.levelNum}>{level}</Text>
          <Text style={styles.levelLabel}>{s.badgesScreen.levelShort}</Text>
        </View>
        <View style={{ flex: 1, gap: 6 }}>
          <Text style={styles.rank}>{rankName(s, level)}</Text>
          <ProgressBar value={levelPct} color={colors.gold} track="rgba(255,255,255,0.25)" />
          <Text style={styles.xp}>
            {nextLevelXp ? s.badgesScreen.xpLeft(xp, nextLevelXp - xp, level + 1) : s.badgesScreen.xpMax(xp)}
          </Text>
        </View>
      </View>

      <Button title={`🛡️ ${s.summary.open}`} variant="secondary" onPress={() => router.push('/conservation')} />

      <Card style={{ gap: 10 }}>
        <Text style={styles.section}>{s.badgesScreen.collection}</Text>
        {CATEGORY_ORDER.map((c) => {
          const total = ANIMALS.filter((a) => a.category === c).length;
          const found = ANIMALS.filter((a) => a.category === c && progress.discovered.has(a.id)).length;
          return (
            <View key={c} style={{ gap: 4 }}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>{CATEGORIES[c].emoji} {s.categories[c].plural}</Text>
                <Text style={styles.statValue}>{found} / {total}</Text>
              </View>
              <ProgressBar value={found / total} color={CATEGORIES[c].color} height={8} />
            </View>
          );
        })}
        <View style={styles.rarityRow}>
          {RARITY_ORDER.map((r) => {
            const found = ANIMALS.filter((a) => a.rarity === r && progress.discovered.has(a.id)).length;
            const total = ANIMALS.filter((a) => a.rarity === r).length;
            return (
              <View key={r} style={styles.rarityCell}>
                <Text style={[styles.rarityCount, { color: RARITIES[r].color }]}>{found}/{total}</Text>
                <Text style={styles.rarityLabel}>{s.rarities[r]}</Text>
              </View>
            );
          })}
        </View>
      </Card>

      <Text style={styles.section}>{s.badgesScreen.title(unlockedBadges.size, BADGES.length)}</Text>
      <View style={styles.grid}>
        {BADGES.map((b) => {
          const [value, goal] = b.progress(progress, sightings);
          const unlocked = unlockedBadges.has(b.id);
          const text = b.text(s);
          return (
            <View key={b.id} style={[styles.badge, !unlocked && { opacity: 0.85 }]}>
              <View style={[styles.medal, { backgroundColor: unlocked ? b.color : colors.locked }]}>
                <Text style={{ fontSize: 30, opacity: unlocked ? 1 : 0.35 }}>{b.emoji}</Text>
              </View>
              <Text style={styles.badgeTitle} numberOfLines={2}>{text.title}</Text>
              <Text style={styles.badgeDesc} numberOfLines={3}>{text.description}</Text>
              {unlocked ? (
                <Text style={[styles.badgeDone, { color: b.color }]}>{s.badgesScreen.unlocked}</Text>
              ) : (
                <View style={{ width: '100%', gap: 3 }}>
                  <ProgressBar value={value / goal} color={b.color} height={6} />
                  <Text style={styles.badgeProgress}>{Math.min(value, goal)} / {goal}</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 16, gap: 14, maxWidth: 900, width: '100%', alignSelf: 'center', paddingBottom: 40 },
  rankCard: { backgroundColor: colors.ink, borderRadius: radius.lg, padding: 16, flexDirection: 'row', gap: 14, alignItems: 'center' },
  levelBubble: {
    width: 72, height: 72, borderRadius: 36, backgroundColor: colors.red, alignItems: 'center', justifyContent: 'center',
    borderWidth: 4, borderColor: colors.gold,
  },
  levelNum: { color: '#fff', fontSize: 28, fontWeight: '900', lineHeight: 30 },
  levelLabel: { color: '#fff', fontSize: 10, fontWeight: '800' },
  rank: { color: '#fff', fontSize: 20, fontWeight: '900' },
  xp: { color: 'rgba(255,255,255,0.75)', fontSize: 12, fontWeight: '600' },
  section: { fontSize: 17, fontWeight: '900', color: colors.ink },
  statRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statLabel: { fontWeight: '700', color: colors.ink },
  statValue: { fontWeight: '800', color: colors.muted },
  rarityRow: { flexDirection: 'row', marginTop: 6 },
  rarityCell: { flex: 1, alignItems: 'center' },
  rarityCount: { fontSize: 18, fontWeight: '900' },
  rarityLabel: { fontSize: 11, color: colors.muted, fontWeight: '700' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  badge: {
    flexBasis: '47%', flexGrow: 1, maxWidth: 260, backgroundColor: colors.card, borderRadius: radius.md, padding: 12,
    alignItems: 'center', gap: 6,
  },
  medal: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#fff' },
  badgeTitle: { fontWeight: '900', color: colors.ink, textAlign: 'center' },
  badgeDesc: { fontSize: 12, color: colors.muted, textAlign: 'center', lineHeight: 16 },
  badgeDone: { fontWeight: '900', fontSize: 13 },
  badgeProgress: { fontSize: 11, color: colors.muted, textAlign: 'center', fontWeight: '700' },
});
