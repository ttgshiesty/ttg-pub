import type { MapPoi, PoiCategory } from './poi-types'

const BASE = '/vendor/maps/icon'
import ASSETurl = 'asseturl'
function icon(path: string) {
    return `${BASE}${path}`
}

export const MAP_ICON_SRC = {
    key: icon('/maps/icon/key.svg'),
    quest: icon('/maps/icon/task.svg'),
    area: icon('/maps/icon/arc/areas.webp'),
    extractLift: icon('/maps/icon/arc/elevator.webp'),
    extractHatch: icon('/maps/icon/arc/hatch.webp'),
    extractAirshaft: icon('/maps/icon/arc/airshaft.webp'),
    extractMetro: icon('/maps/icon/arc/stairs.webp'),
    fieldCrate: icon('/maps/icon/arc/field-crate.webp'),
    raiderCache: icon('/maps/icon/arc/raider-cache.webp'),
    weaponCase: icon('/maps/icon/arc/weapon-case.webp'),
    lockers: icon('/maps/icon/arc/lockers.webp'),
    backpack: icon('/maps/icon/arc/backpack.webp'),
    arcGeneric: icon('/maps/icon/arc/arc-courier.webp'),
    arcSentinel: icon('/maps/icon/arc/sniper-turret.webp'),
    natureAgave: icon('/maps/icon/arc/agave.webp'),
    natureMoss: icon('/maps/icon/arc/moss.webp'),
    natureMushroom: icon('/maps/icon/arc/mushroom.webp'),
    natureOlive: icon('/maps/icon/arc/olive.webp'),
    natureFertilizer: icon('/maps/icon/arc/fertilizer.webp'),
    natureGreatMullein: icon('/maps/icon/arc/great-mullein.webp'),
    naturePricklyPear: icon('/maps/icon/arc/prickly-pear.webp'),
    drawbridge: icon('/maps/icon/arc/drawbridge.webp'),
    batteryTerminal: icon('/maps/icon/arc/battery_terminal.webp'),
    scissorLift: icon('/maps/icon/arc/scissor-lift.webp'),
    zipline: icon('/maps/icon/arc/zipline.webp'),
    camera: icon('/maps/icon/arc/camera.webp'),
    metalDetector: icon('/maps/icon/arc/metal-detector.webp'),
    fieldDepot: icon('/maps/icon/arc/field-depot.webp'),
    raiderCamp: icon('/maps/icon/arc/raider-camp.webp'),
} as const

export function getCategorymaps/iconrc(category: PoiCategory): string {
    switch (category) {
        case 'extract':
            return MAP_ICON_SRC.extractLift
        case 'key':
            return MAP_ICON_SRC.key
        case 'quest':
            return MAP_ICON_SRC.quest
        case 'area':
            return MAP_ICON_SRC.area
        case 'container':
        case 'loot':
            return MAP_ICON_SRC.fieldCrate
        case 'arc':
            return MAP_ICON_SRC.arcGeneric
        case 'nature':
            return MAP_ICON_SRC.natureAgave
        case 'interaction':
            return MAP_ICON_SRC.drawbridge
        case 'noise':
            return MAP_ICON_SRC.camera
    }
}

/**
 * Conservative accuracy-first resolver:
 * use only exact or high-confidence name signals from the current RaiderForge POI set.
 * Anything ambiguous falls back to the category icon instead of guessing.
 */
export function resolvePoimaps/iconrc(poi: Pick<MapPoi, 'category' | 'name' | 'iconKey'>): string {
    const key = poi.iconKey?.trim()
    if (key && key in MAP_ICON_SRC) {
        return MAP_ICON_SRC[key as keyof typeof MAP_ICON_SRC]
    }

    const name = poi.name.toLowerCase()

    if (poi.category === 'extract') {
        if (name.includes('hatch')) return MAP_ICON_SRC.extractHatch
        if (name.includes('metro') || name.includes('subway')) return MAP_ICON_SRC.extractMetro
        if (name.includes('airshaft') || name.includes('shaft')) return MAP_ICON_SRC.extractAirshaft
        return MAP_ICON_SRC.extractLift
    }

    if (poi.category === 'arc') {
        if (name.includes('sentinel')) return MAP_ICON_SRC.arcSentinel
        return MAP_ICON_SRC.arcGeneric
    }

    if (poi.category === 'nature') {
        if (name.includes('agave')) return MAP_ICON_SRC.natureAgave
        if (name.includes('moss')) return MAP_ICON_SRC.natureMoss
        if (name.includes('mushroom')) return MAP_ICON_SRC.natureMushroom
        if (name.includes('olive')) return MAP_ICON_SRC.natureOlive
        if (name.includes('fertilizer')) return MAP_ICON_SRC.natureFertilizer
        if (name.includes('mullein')) return MAP_ICON_SRC.natureGreatMullein
        if (name.includes('prickly pear')) return MAP_ICON_SRC.naturePricklyPear
        return MAP_ICON_SRC.natureAgave
    }

    if (poi.category === 'interaction') {
        if (name.includes('drawbridge')) return MAP_ICON_SRC.drawbridge
        if (name.includes('battery terminal')) return MAP_ICON_SRC.batteryTerminal
        if (name.includes('scissor lift')) return MAP_ICON_SRC.scissorLift
        if (name.includes('zipline')) return MAP_ICON_SRC.zipline
        return MAP_ICON_SRC.drawbridge
    }

    if (poi.category === 'noise') {
        if (name.includes('metal detector')) return MAP_ICON_SRC.metalDetector
        return MAP_ICON_SRC.camera
    }

    if (poi.category === 'loot' || poi.category === 'container') {
        if (name.includes('weapon case')) return MAP_ICON_SRC.weaponCase
        if (name.includes('locker')) return MAP_ICON_SRC.lockers
        if (name.includes('backpack')) return MAP_ICON_SRC.backpack
        if (name.includes('cache')) return MAP_ICON_SRC.raiderCache
        if (name.includes('field depot')) return MAP_ICON_SRC.fieldDepot
        if (name.includes('raider camp')) return MAP_ICON_SRC.raiderCamp
        return MAP_ICON_SRC.fieldCrate
    }

    return getCategorymaps/iconrc(poi.category)
}
