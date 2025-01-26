var Build = (function() {
    var FALLBACK_ICON = 'coui://ui/main/game/live_game/img/build_bar/img_missing_unit.png';
    var pathWithoutExtensionMatch = /(.*)\.json[^\/]*$/;

    var iconForSpecId = function(id)
    {
        var match = null;
        if (id)
            match = pathWithoutExtensionMatch.exec(id);

        if (_.size(match) < 2)
            return FALLBACK_ICON;

        return 'coui:/' + match[1] + '_icon_buildbar.png';
    };

    var iconForUnit = function (unit)
    {
        if (!unit)
            return FALLBACK_ICON;
        return iconForSpecId(unit.id);
    };

    var HotkeyModel = function()
    {
        var self = this;

        self.SpecIdToGridMap = ko.observable(
          _.cloneDeep(HotkeyModel.SpecIdToGridMap));
    };

    // historical build bar is 3 x 6 using indexes 0 to 17
    // new build bar is flexible using row / column

    HotkeyModel.SpecIdToGridMap =
    {
        "/pa/units/land/energy_plant/energy_plant.json": ["utility", 9, {row: 1, column: 2}],
        "/pa/units/land/metal_extractor/metal_extractor.json": ["utility", 10, {row: 1, column: 3}],

        "/pa/units/land/land_barrier/land_barrier.json": ["utility", 12, {row: 2, column: 0}],
        "/pa/units/land/teleporter/teleporter.json": ["utility", 13, {row: 2, column: 1}],
        "/pa/units/land/radar/radar.json": ["utility", 14, {row: 1, column: 1}],
        "/pa/units/land/energy_storage/energy_storage.json": ["utility", 15, {row: 2, column: 2}],
        "/pa/units/land/metal_storage/metal_storage.json": ["utility", 16, {row: 2, column: 3}],

        "/pa/units/land/artillery_long/artillery_long.json": ["combat", 2, {row: 1, column: 2}],
        "/pa/units/land/tactical_missile_launcher/tactical_missile_launcher.json": ["combat", 3, {row: 1, column: 0}],

        "/pa/units/land/laser_defense/laser_defense.json": ["combat", 6, {row: 2, column: 0}],
        "/pa/units/land/air_defense_adv/air_defense_adv.json": ["combat", 7, {row: 1, column: 1}],

        "/pa/units/land/laser_defense_single/laser_defense_single.json": ["utility", 17, {row: 2, column: 1}],
        "/pa/units/land/artillery_short/artillery_short.json": ["combat", 14, {row: 2, column: 1}],
		"/pa/units/land/artillery_unit_launcher/artillery_unit_launcher.json": ["combat", 15, {row: 1, column: 1}],

        "/pa/units/land/land_mine/land_mine.json": ["ammo", 14, {row: 2, column: 2}]
    };

    return {
        iconForSpecId: iconForSpecId,
        iconForUnit: iconForUnit,
        HotkeyModel: HotkeyModel,
    };
})();

if (scene_mod_list['shared_build']) {
  loadMods(scene_mod_list['shared_build'])
}

// check for legacy indexes from mods

_.forEach( Build.HotkeyModel.SpecIdToGridMap, function(value, id)
{
    var size = value.length;
    var index = value[1];

    var row = Math.floor(index / 6);
    var column = column = index % 6

    if (size == 2)
    {
        var options =
        {
            row: row,
            column: column,
        }
        Build.HotkeyModel.SpecIdToGridMap[id].push(options);
        console.log('build.js old', index, row, column);
    }
})
