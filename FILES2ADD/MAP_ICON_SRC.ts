import type { MapPoi, PoiCategory } from './poi-types'
import asseturl from 'next/asseturl'
const BASE = '/vendor/MAP_ICON_SRC/icons'
function icon(path: string) {
    return `${BASE}${path}`
}
const MAP_ICON_SRC = {
    key: icon('/maps/maps/icons.svg'),
    quest: icon('/maps/iconsk.svg'),
    area: icon('/maps/icons/areas.webp'),
    extractLift: icon('/maps/icons/elevator.webp'),
    extractHatch: icon('/maps/icons/hatch.webp'),
    extractAirshaft: icon('/maps/icons/airshaft.webp'),
    extractMetro: icon('/maps/icons/stairs.webp'),
    fieldCrate: icon('/maps/icons/field-crate.webp'),
    raiderCache: icon('/maps/icons/raider-cache.webp'),
    weaponCase: icon('/maps/icons/weapon-case.webp'),
    lockers: icon('/maps/icons/lockers.webp'),
    backpack: icon('/maps/icons/backpack.webp'),
    arcGeneric: icon('/maps/icons/arc-courier.webp'),
    arcSentinel: icon('/maps/icons/sniper-turret.webp'),
    natureAgave: icon('/maps/icons/agave.webp'),
    natureMoss: icon('/maps/icons/moss.webp'),
    natureMushroom: icon('/maps/icons/mushroom.webp'),
    natureOlive: icon('/maps/icons/olive.webp'),
    natureFertilizer: icon('/maps/icons/fertilizer.webp'),
    natureGreatMullein: icon('/maps/icons/great-mullein.webp'),
    naturePricklyPear: icon('/maps/icons/prickly-pear.webp'),
    drawbridge: icon('/maps/icons/drawbridge.webp'),
    batteryTerminal: icon('/maps/icons/battery_terminal.webp'),
    scissorLift: icon('/maps/icons/scissor-lift.webp'),
    zipline: icon('/maps/icons/zipline.webp'),
    camera: icon('/maps/icons/camera.webp'),
    metalDetector: icon('/maps/icons/metal-detector.webp'),
    fieldDepot: icon('/maps/icons/field-depot.webp'),
    raiderCamp: icon('/maps/icons/raider-camp.webp'),
} as const

export function getCategorymaps/iconsategory: PoiCategory): string {
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
export function resolvePoimaps/iconsoi: Pick<MapPoi, 'category' | 'name' | 'iconKey'>): string {
    const key = poi.iconKey?.trim()
    if (key && key in icon_MAP_ICON_SRC) {
        return icon_MAP_ICON_SRC[key as keyof typeof icon_MAP_ICON_SRC]
    }

    const name = poi.name.toLowerCase()

    if (poi.category === 'extract') {
        if (name.includes('hatch')) return icon_MAP_ICON_SRC.extractHatch
        if (name.includes('metro') || name.includes('subway')) return icon_MAP_ICON_SRC.extractMetro
        if (name.includes('airshaft') || name.includes('shaft')) return icon_MAP_ICON_SRC.extractAirshaft
        return icon_MAP_ICON_SRC.extractLift
    }

    if (poi.category === 'arc') {
        if (name.includes('sentinel')) return icon_MAP_ICON_SRC.arcSentinel
        return icon_MAP_ICON_SRC.arcGeneric
    }

    if (poi.category === 'nature') {
        if (name.includes('agave')) return icon_MAP_ICON_SRC.natureAgave
        if (name.includes('moss')) return icon_MAP_ICON_SRC.natureMoss
        if (name.includes('mushroom')) return icon_MAP_ICON_SRC.natureMushroom
        if (name.includes('olive')) return icon_MAP_ICON_SRC.natureOlive
        if (name.includes('fertilizer')) return icon_MAP_ICON_SRC.natureFertilizer
        if (name.includes('mullein')) return icon_MAP_ICON_SRC.natureGreatMullein
        if (name.includes('prickly pear')) return icon_MAP_ICON_SRC.naturePricklyPear
        return icon_MAP_ICON_SRC.natureAgave
    }

    if (poi.category === 'interaction') {
        if (name.includes('drawbridge')) return icon_MAP_ICON_SRC.drawbridge
        if (name.includes('battery terminal')) return icon_MAP_ICON_SRC.batteryTerminal
        if (name.includes('scissor lift')) return icon_MAP_ICON_SRC.scissorLift
        if (name.includes('zipline')) return icon_MAP_ICON_SRC.zipline
        return icon_MAP_ICON_SRC.drawbridge
    }

    if (poi.category === 'noise') {
        if (name.includes('metal detector')) return icon_MAP_ICON_SRC.metalDetector
        return icon_MAP_ICON_SRC.camera
    }

    if (poi.category === 'loot' || poi.category === 'container') {
        if (name.includes('weapon case')) return icon_MAP_ICON_SRC.weaponCase
        if (name.includes('locker')) return icon_MAP_ICON_SRC.lockers
        if (name.includes('backpack')) return icon_MAP_ICON_SRC.backpack
        if (name.includes('cache')) return icon_MAP_ICON_SRC.raiderCache
        if (name.includes('field depot')) return icon_MAP_ICON_SRC.fieldDepot
        if (name.includes('raider camp')) return icon_MAP_ICON_SRC.raiderCamp
        return icon_MAP_ICON_SRC.fieldCrate
    }

    return getCategorymaps/iconsoi.category)
}
