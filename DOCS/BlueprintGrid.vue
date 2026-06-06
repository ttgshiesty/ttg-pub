<template>
  <div>
    <!-- Missing Blueprints Badge -->
    <div class="badge-row">
      <div class="missing-badge" @click="showSideNav = !showSideNav">
        <span class="badge-count">{{ missingCount }}</span>
        <span class="badge-label">Missing</span>
      </div>
    </div>

    <!-- Side Navigation Panel -->
    <transition name="slide">
      <div v-if="showSideNav" class="side-nav">
        <div class="side-nav-header">
          <h2>Missing Blueprints</h2>
          <button class="close-btn" @click="showSideNav = false">✕</button>
        </div>
        <div class="side-nav-content">
          <div v-if="missingBlueprints.length === 0" class="empty-state">
            🎉 You have all blueprints!
          </div>
          <div v-else class="missing-list">
            <div
              v-for="blueprint in missingBlueprints"
              :key="blueprint.id"
              class="missing-item"
              @click="toggleBlueprint(blueprint.id)"
            >
              <img :src="blueprint.imagePath" :alt="blueprint.name" class="missing-item-img" />
              <span class="missing-item-name">{{ blueprint.name || 'Unknown' }}</span>
            </div>
          </div>
        </div>
        <button class="reset-btn side-nav-reset-bottom" @click="resetBlueprints" title="Reset all">
          Reset
        </button>
      </div>
    </transition>

    <!-- Backdrop -->
    <transition name="fade">
      <div v-if="showSideNav" class="backdrop" @click="showSideNav = false"></div>
    </transition>

    <!-- Blueprint Grid -->
    <div class="blueprint-grid">
      <div
        v-for="(blueprint, index) in blueprints"
        :key="index"
        class="blueprint-cell"
      >
        <div
          class="blueprint-item"
          :class="[{ missing: blueprint.missing, unavailable: !blueprint.name }]"
          :style="{ backgroundImage: `url(${blueprint.imagePath})` }"
          @click="blueprint.name ? toggleBlueprint(blueprint.id) : null"
        >
          <div class="blueprint-content">
            <span v-if="!blueprint.name" class="unavailable-text">Unavailable</span>
            <span v-else-if="blueprint.missing" class="status">Missing</span>
            <span v-else class="status">Owned</span>
          </div>
        </div>
        <div v-if="blueprint.name" class="blueprint-title">{{ blueprint.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Blueprint {
  id: number;
  name?: string;
  missing: boolean;
  imagePath: string;
}

// Initial blueprint data - all start as missing
const initialBlueprints: Blueprint[] = [
  { id: 1, name: "Bettina", missing: true, imagePath: "/images/bettina-bp.png" },
  { id: 2, name: "Blue Light Stick", missing: true, imagePath: "/images/blue-light-stick-bp.png" },
  { id: 3, name: "Aphelion", missing: true, imagePath: "/images/aphelion-bp.png" },
  { id: 4, name: "Combat Mk. 3 (Flanking)", missing: true, imagePath: "/images/combat-mk3-flanking-bp.png" },
  { id: 5, name: "Combat Mk. 3 (Aggressive)", missing: true, imagePath: "/images/combat-mk3-aggressive-bp.png" },
  { id: 6, name: "Complex Gun Parts", missing: true, imagePath: "/images/complex-gun-parts-bp.png" },
  { id: 7, name: "Fireworks Box", missing: true, imagePath: "/images/fireworks-box-bp.png" },
  { id: 8, name: "Gas Mine", missing: true, imagePath: "/images/gas-mine-bp.png" },
  { id: 9, name: "Green Light Stick", missing: true, imagePath: "/images/green-light-stick-bp.png" },
  { id: 10, name: "Pulse Mine", missing: true, imagePath: "/images/pulse-mine-bp.png" },
  { id: 11, name: "Seeker Grenade", missing: true, imagePath: "/images/seeker-grenade-bp.png" },
  { id: 12, name: "Looting Mk. 3 (Survivor)", missing: true, imagePath: "/images/looting-mk3-survivor-bp.png" },
  { id: 13, name: "Angled Grip II", missing: true, imagePath: "/images/angled-grip-2-bp.png" },
  { id: 14, name: "Angled Grip III", missing: true, imagePath: "/images/angled-grip-3-bp.png" },
  { id: 15, name: "Hullcracker", missing: true, imagePath: "/images/hullcracker-bp.png" },
  { id: 16, name: "Anvil", missing: true, imagePath: "/images/anvil-bp.png" },
  { id: 19, name: "Barricade Kit", missing: true, imagePath: "/images/barricade-kit-bp.png" },
  { id: 20, name: "Blaze Grenade", missing: true, imagePath: "/images/blaze-grenade-bp.png" },
  { id: 21, name: "Bobcat", missing: true, imagePath: "/images/bobcat-bp.png" },
  { id: 22, name: "Osprey", missing: true, imagePath: "/images/osprey-bp.png" },
  { id: 23, name: "Burletta", missing: true, imagePath: "/images/burletta-bp.png" },
  { id: 24, name: "Compensator II", missing: true, imagePath: "/images/compensator-2-bp.png" },
  { id: 25, name: "Compensator III", missing: true, imagePath: "/images/compensator-3-bp.png" },
  { id: 26, name: "Defibrillator", missing: true, imagePath: "/images/defibrillator-bp.png" },
  { id: 28, name: "Equalizer", missing: true, imagePath: "/images/equalizer-bp.png" },
  { id: 29, name: "Extended Barrel", missing: true, imagePath: "/images/extended-barrel-bp.png" },
  { id: 30, name: "Extended Light Magazine II", missing: true, imagePath: "/images/extended-light-mag-2-bp.png" },
  { id: 31, name: "Extended Light Magazine III", missing: true, imagePath: "/images/extended-light-mag-3-bp.png" },
  { id: 32, name: "Extended Medium Magazine II", missing: true, imagePath: "/images/extended-medium-bp-2.png" },
  { id: 33, name: "Extended Medium Magazine III", missing: true, imagePath: "/images/extended-medium-mag-3-bp.png" },
  { id: 34, name: "Extended Shotgun Magazine II", missing: true, imagePath: "/images/extended-shotgun-mag-2-bp.png" },
  { id: 35, name: "Extended Shotgun Magazine III", missing: true, imagePath: "/images/extended-shotgun-mag-3-bp.png" },
  { id: 36, name: "Remote Raider Flare", missing: true, imagePath: "/images/remote-raider-flare-bp.png" },
  { id: 37, name: "Heavy Gun Parts", missing: true, imagePath: "/images/heavy-gun-parts-bp.png" },
  { id: 38, name: "Venator", missing: true, imagePath: "/images/venator-bp.png" },
  { id: 39, name: "Il Toro", missing: true, imagePath: "/images/il-toro-bp.png" },
  { id: 40, name: "Jolt Mine", missing: true, imagePath: "/images/jolt-mine-bp.png" },
  { id: 41, name: "Explosive Mine", missing: true, imagePath: "/images/explosive-mine-bp.png" },
  { id: 42, name: "Jupiter", missing: true, imagePath: "/images/jupiter-bp.png" },
  { id: 43, name: "Light Gun Parts", missing: true, imagePath: "/images/light-gun-parts-bp.png" },
  { id: 44, name: "Lightweight Stock", missing: true, imagePath: "/images/lightweight-stock-bp.png" },
  { id: 45, name: "Looting Mk. 3 (Safekeeper)", missing: true, imagePath: "/images/looting-mk-3-safekeeper-bp.png" },
  { id: 46, name: "Lure Grenade", missing: true, imagePath: "/images/lure-grenade-bp.png" },
  { id: 47, name: "Medium Gun Parts", missing: true, imagePath: "/images/medium-gun-parts-bp.png" },
  { id: 48, name: "Torrente", missing: true, imagePath: "/images/torrente-bp.png" },
  { id: 49, name: "Muzzle Brake II", missing: true, imagePath: "/images/muzzle-brake-2-bp.png" },
  { id: 50, name: "Muzzle Brake III", missing: true, imagePath: "/images/muzzle-brake-3-bp.png" },
  { id: 51, name: "Padded Stock", missing: true, imagePath: "/images/padded-stock-bp.png" },
  { id: 52, name: "Shotgun Choke II", missing: true, imagePath: "/images/shotgun-choke-2-bp.png" },
  { id: 53, name: "Shotgun Choke III", missing: true, imagePath: "/images/shotgun-choke-3-bp.png" },
  { id: 54, name: "Shotgun Silencer", missing: true, imagePath: "/images/shotgun-silencer-bp.png" },
  { id: 55, name: "Showstopper", missing: true, imagePath: "/images/showstopper-bp.png" },
  { id: 56, name: "Silencer I", missing: true, imagePath: "/images/silencer-1-bp.png" },
  { id: 57, name: "Silencer II", missing: true, imagePath: "/images/silencer-2-bp.png" },
  { id: 58, name: "Snap Hook", missing: true, imagePath: "/images/snap-hook-bp.png" },
  { id: 59, name: "Stable Stock II", missing: true, imagePath: "/images/stable-stock-2-bp.png" },
  { id: 60, name: "Stable Stock III", missing: true, imagePath: "/images/stable-stock-3-bp.png" },
  { id: 61, name: "Tagging Grenade", missing: true, imagePath: "/images/tagging-grenade-bp.png" },
  { id: 62, name: "Tempest", missing: true, imagePath: "/images/tempest-bp.png" },
  { id: 63, name: "Trigger 'Nade", missing: true, imagePath: "/images/trigger-nade-bp.png" },
  { id: 64, name: "Vertical Grip II", missing: true, imagePath: "/images/vertical-grip-2-bp.png" },
  { id: 65, name: "Vertical Grip III", missing: true, imagePath: "/images/vertical-3-bp.png" },
  { id: 66, name: "Vita Shot", missing: true, imagePath: "/images/vita-shot-bp.png" },
  { id: 67, name: "Vita Spray", missing: true, imagePath: "/images/vita-spray-bp.png" },
  { id: 68, name: "Vulcano", missing: true, imagePath: "/images/vulcano-bp.png" },
  { id: 69, name: "Wolfpack", missing: true, imagePath: "/images/wolfpack-bp.png" },
  { id: 70, name: "Red Light Stick", missing: true, imagePath: "/images/red-light-stick-bp.png" },
  { id: 71, name: "Smoke Grenade", missing: true, imagePath: "/images/smoke-grenade-bp.png" },
  { id: 72, name: "Tactical Mk. 3 (Revival)", missing: true, imagePath: "/images/tactical-mk-3-revival-bp.png" },
  { id: 73, name: "Deadline", missing: true, imagePath: "/images/deadline-bp.png" },
  { id: 74, name: "Trailblazer", missing: true, imagePath: "/images/trailblazer-bp.png" },
  { id: 75, name: "Tactical Mk. 3 (Defensive)", missing: true, imagePath: "/images/tactical-mk-3-defensive-bp.png" },
  { id: 76, name: "Tactical Mk. 3 (Healing)", missing: true, imagePath: "/images/tactical-mk-3-healing-bp.png" },
  { id: 77, name: "Yellow Light Stick", missing: true, imagePath: "/images/yellow-light-stick-bp.png" }
];

const STORAGE_KEY = 'arc-blueprints-owned';

const blueprints = ref<Blueprint[]>([...initialBlueprints]);
const showSideNav = ref(false);

// Computed properties
const missingBlueprints = computed(() => 
  blueprints.value.filter(bp => bp.missing && bp.name)
);

const missingCount = computed(() => missingBlueprints.value.length);

// Load owned blueprints from localStorage
const loadFromStorage = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const ownedIds = JSON.parse(stored) as number[];
        blueprints.value.forEach(bp => {
          bp.missing = !ownedIds.includes(bp.id);
        });
      } catch (e) {
        console.error('Failed to load blueprints from storage', e);
      }
    }
  }
};

// Save owned blueprints to localStorage
const saveToStorage = () => {
  if (typeof window !== 'undefined') {
    const ownedIds = blueprints.value
      .filter(bp => !bp.missing)
      .map(bp => bp.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ownedIds));
  }
};

// Toggle blueprint ownership
const toggleBlueprint = (id: number) => {
  const blueprint = blueprints.value.find(bp => bp.id === id);
  if (blueprint) {
    blueprint.missing = !blueprint.missing;
    saveToStorage();
  }
};

// Reset all blueprints
const resetBlueprints = () => {
  blueprints.value.forEach(bp => {
    if (bp.name) bp.missing = true;
  });
  saveToStorage();
};

// Load data on mount
onMounted(() => {
  loadFromStorage();
});
</script>

<style scoped>
/* Missing Badge */
.missing-badge {
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: linear-gradient(135deg, #dc2626, #991b1b);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
  transition: all 0.3s ease;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  min-width: 80px;
}

.missing-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(220, 38, 38, 0.5);
}

.badge-count {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.badge-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.9;
}

/* Side Navigation */
.side-nav {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: #1a1a1a;
  border-left: 2px solid #dc2626;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.5);
}

.side-nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid #333;
  background: #0a0a0a;
}

.side-nav-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #dc2626;
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.close-btn:hover {
  background: #333;
}

.side-nav-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  font-size: 1.25rem;
  color: #16a34a;
}

.missing-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.missing-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #0a0a0a;
  border: 2px solid #dc2626;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.missing-item:hover {
  background: #2a1a1a;
  transform: translateX(-4px);
}

.missing-item-img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 4px;
  background: #1a1a1a;
  padding: 0.25rem;
}

.missing-item-name {
  flex: 1;
  font-weight: 500;
  color: #fff;
}

/* Backdrop */
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
}

/* Animations */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Blueprint Grid */
.blueprint-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 1rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.blueprint-cell {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.blueprint-item {
  aspect-ratio: 1;
  border: 2px solid #333;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1a1a1a;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.blueprint-title {
  margin-top: 0.4rem;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 500;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.7);
  word-break: break-word;
  min-height: 1.2em;
}

.blueprint-item::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.3);
  transition: background 0.3s ease;
}

.blueprint-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.blueprint-item:hover::before {
  background: rgba(0, 0, 0, 0.2);
}

.blueprint-item.missing {
  border-color: #dc2626;
}

.blueprint-item.missing::before {
  background: rgba(220, 38, 38, 0.2);
}

.blueprint-item:not(.missing) {
  border-color: #16a34a;
}

.blueprint-item:not(.missing)::before {
  background: rgba(22, 163, 74, 0.2);
}

.blueprint-content {
  text-align: center;
  padding: 0.5rem;
  position: relative;
  z-index: 1;
}

.status {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

.missing .status {
  color: #dc2626;
}

.blueprint-item:not(.missing) .status {
  color: #16a34a;
}

.blueprint-item.unavailable {
  filter: grayscale(1) brightness(0.5);
  border-color: #555 !important;
  cursor: not-allowed;
  pointer-events: none;
}

.unavailable-text {
  color: #aaa;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  text-shadow: 0 2px 4px rgba(0,0,0,0.7);
}

/* Reset Button */
.reset-btn.side-nav-reset-bottom {
  display: block;
  margin: 2rem auto 1.5rem auto;
  background: #222;
  color: #bbb;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: none;
  transition: background 0.2s, color 0.2s;
}

.reset-btn.side-nav-reset-bottom:hover {
  background: #333;
  color: #fff;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .blueprint-grid {
    grid-template-columns: repeat(8, 1fr);
  }
}

@media (max-width: 900px) {
  .blueprint-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 600px) {
  .blueprint-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    padding: 1rem;
  }
}
</style>
