require('dotenv').config()

/**
 * Route prefix
 */
export const route_prefix = "/admin/"
export const dashboardURL = "dashboard"
/**
 * Set Default route
 */
export const default_route = route_prefix + dashboardURL

/**
 * Base URL
 * api prefix
 */

export const baseURL = process.env.API_URL || "http://178.128.45.110/load";  /* "http://178.128.56.249/load" */
console.log("baseURL", process.env.API_URL, baseURL);

// export const baseURL = "http://192.168.0.129:1001"
export const api_prefix = baseURL + route_prefix

/**
 * For Listing Dynamically pagination list drop-down
 */
export const LIMITS = [
    { key: '10', value: 10 },
    { key: '25', value: 25 },
    { key: '50', value: 50 },
    { key: '100', value: 100 },
    { key: '150', value: 150 },
    { key: '300', value: 300 },
    { key: '500', value: 500 },
];

/**
 * All Module APi Collections
 */
export const ApiCollections = {
    getImage: { method: "get", url: baseURL },

    login: { method: "POST", url: api_prefix + "login" },
    forgorPassword: { method: "POST", url: api_prefix + "forgot-password" },
    changePassword: { method: "POST", url: api_prefix + "change-possword" },
    users_listing: { method: "GET", url: api_prefix + "users-list", },
    getUserById: { method: "GET", url: api_prefix + "user/", },
    update_user: { method: "post", url: api_prefix + "user-update", headers: { headers: { 'content-type': 'multipart/form-data' } } },
    update_profile: {
        method: "post",
        url: api_prefix + "user-profile",
    },
    upload_image: {
        method: 'post', url: api_prefix + "upload",
        headers: {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
    },
    users_status_change: { method: "delete", url: api_prefix + "users-status-change", },
    get_users_count_by_type: { method: 'get', url: api_prefix + "get-user-count-by-type" },

    /** Masters Action Force */
    action_force_listing: { method: "POST", url: api_prefix + "action-force-list", },
    create_action_force: { method: "POST", url: api_prefix + "action-force-create", },
    update_action_force: { method: "put", url: api_prefix + "action-force-update/", },
    get_action_force: { method: "GET", url: api_prefix + "action-force-show/", },
    delete_action_force: { method: "delete", url: api_prefix + "action-force-delete/", },
    action_force_status_change: { method: "delete", url: api_prefix + "action-force-status-change", },

    /** Masters Body Parts */
    body_part_listing: { method: "POST", url: api_prefix + "body-part-list", },
    body_part_parent_listing: { method: "POST", url: api_prefix + "body-part-list", },
    create_body_part: { method: "POST", url: api_prefix + "body-part-create", },
    update_body_part: { method: "put", url: api_prefix + "body-part-update/", },
    get_body_part: { method: "GET", url: api_prefix + "body-part-show/", },
    delete_body_part: { method: "delete", url: api_prefix + "body-part-delete/", },
    body_part_status_change: { method: "delete", url: api_prefix + "body-part-status-change", },

    /** Masters Cancellation Policy */
    cancellation_policy_listing: { method: "POST", url: api_prefix + "cancellation-policy-list", },
    create_cancellation_policy: { method: "POST", url: api_prefix + "cancellation-policy-create", },
    update_cancellation_policy: { method: "put", url: api_prefix + "cancellation-policy-update/", },
    get_cancellation_policy: { method: "GET", url: api_prefix + "cancellation-policy-show/", },
    delete_cancellation_policy: { method: "delete", url: api_prefix + "cancellation-policy-delete/", },
    cancellation_policy_status_change: { method: "delete", url: api_prefix + "cancellation-policy-status-change", },

    /** Masters Action Force */
    accounts_listing: { method: "POST", url: api_prefix + "accounts-list", },
    create_accounts: { method: "POST", url: api_prefix + "accounts-create", },
    update_accounts: { method: "put", url: api_prefix + "accounts-update/", },
    get_accounts: { method: "GET", url: api_prefix + "accounts-show/", },
    delete_accounts: { method: "delete", url: api_prefix + "accounts-delete/", },
    accounts_status_change: { method: "delete", url: api_prefix + "accounts-status-change", },
    accounts_delete_multiple: { method: "POST", url: api_prefix + "accounts-status-delete-many", },

    /** Masters Countries countries */
    countries_listing: { method: "POST", url: api_prefix + "countries-list", },
    create_countries: { method: "POST", url: api_prefix + "countries-create", },
    update_countries: { method: "put", url: api_prefix + "countries-update/", },
    get_countries: { method: "GET", url: api_prefix + "countries-show/", },
    delete_countries: { method: "delete", url: api_prefix + "countries-delete/", },
    countries_status_change: { method: "delete", url: api_prefix + "countries-status-change", },
    countries_delete_multiple: { method: "POST", url: api_prefix + "countries-status-delete-many", },

    /** Masters currency */
    currency_listing: { method: "POST", url: api_prefix + "currency-list", },
    create_currency: { method: "POST", url: api_prefix + "currency-create", },
    update_currency: { method: "put", url: api_prefix + "currency-update/", },
    get_currency: { method: "GET", url: api_prefix + "currency-show/", },
    delete_currency: { method: "delete", url: api_prefix + "currency-delete/", },
    currency_status_change: { method: "delete", url: api_prefix + "currency-status-change", },
    currency_delete_multiple: { method: "POST", url: api_prefix + "currency-status-delete-many", },

    /** Masters Equipments countries */
    equipments_listing: { method: "POST", url: api_prefix + "equipments-list", },
    create_equipments: { method: "POST", url: api_prefix + "equipments-create", },
    update_equipments: { method: "put", url: api_prefix + "equipments-update/", },
    get_equipments: { method: "GET", url: api_prefix + "equipments-show/", },
    delete_equipments: { method: "delete", url: api_prefix + "equipments-delete/", },
    equipments_status_change: { method: "delete", url: api_prefix + "equipments-status-change", },
    equipments_delete_multiple: { method: "POST", url: api_prefix + "equipments-status-delete-many", },

    /** Masters Languages countries */
    languages_listing: { method: "POST", url: api_prefix + "languages-list", },
    create_languages: { method: "POST", url: api_prefix + "languages-create", },
    update_languages: { method: "put", url: api_prefix + "languages-update/", },
    get_languages: { method: "GET", url: api_prefix + "languages-show/", },
    delete_languages: { method: "delete", url: api_prefix + "languages-delete/", },
    languages_status_change: { method: "delete", url: api_prefix + "languages-status-change", },
    languages_delete_multiple: { method: "POST", url: api_prefix + "languages-status-delete-many", },

    /** Masters Machines countries */
    machines_listing: { method: "POST", url: api_prefix + "machines-list", },
    create_machines: { method: "POST", url: api_prefix + "machines-create", },
    update_machines: { method: "put", url: api_prefix + "machines-update/", },
    get_machines: { method: "GET", url: api_prefix + "machines-show/", },
    delete_machines: { method: "delete", url: api_prefix + "machines-delete/", },
    machines_status_change: { method: "delete", url: api_prefix + "machines-status-change", },
    machines_delete_multiple: { method: "POST", url: api_prefix + "machines-status-delete-many", },

    /** Masters regions countries */
    regions_listing: { method: "POST", url: api_prefix + "regions-list", },
    create_regions: { method: "POST", url: api_prefix + "regions-create", },
    update_regions: { method: "put", url: api_prefix + "regions-update/", },
    get_regions: { method: "GET", url: api_prefix + "regions-show/", },
    delete_regions: { method: "delete", url: api_prefix + "regions-delete/", },
    regions_status_change: { method: "delete", url: api_prefix + "regions-status-change", },
    regions_delete_multiple: { method: "POST", url: api_prefix + "regions-status-delete-many", },

    /** Masters repetition_max countries */
    repetition_max_listing: { method: "POST", url: api_prefix + "repetition-max-list", },
    create_repetition_max: { method: "POST", url: api_prefix + "repetition-max-create", },
    update_repetition_max: { method: "put", url: api_prefix + "repetition-max-update/", },
    get_repetition_max: { method: "GET", url: api_prefix + "repetition-max-show/", },
    delete_repetition_max: { method: "delete", url: api_prefix + "repetition-max-delete/", },
    repetition_max_status_change: { method: "delete", url: api_prefix + "repetition-max-status-change", },
    repetition_delete_multiple: { method: "POST", url: api_prefix + "repetition-max-status-delete-many", },

    /** Masters services countries */
    services_listing: { method: "POST", url: api_prefix + "services-list", },
    create_services: { method: "POST", url: api_prefix + "services-create", },
    update_services: { method: "put", url: api_prefix + "services-update/", },
    get_services: { method: "GET", url: api_prefix + "services-show/", },
    delete_services: { method: "delete", url: api_prefix + "services-delete/", },
    services_status_change: { method: "delete", url: api_prefix + "services-status-change", },
    services_delete_multiple: { method: "POST", url: api_prefix + "services-status-delete-many", },

    /** Masters specializations countries */
    specializations_listing: { method: "POST", url: api_prefix + "specializations-list", },
    create_specializations: { method: "POST", url: api_prefix + "specializations-create", },
    update_specializations: { method: "put", url: api_prefix + "specializations-update/", },
    get_specializations: { method: "GET", url: api_prefix + "specializations-show/", },
    delete_specializations: { method: "delete", url: api_prefix + "specializations-delete/", },
    specializations_status_change: { method: "delete", url: api_prefix + "specializations-status-change", },
    specializations_delete_multiple: { method: "POST", url: api_prefix + "specializations-status-delete-many", },

    /** Masters targeted_muscles countries */
    targeted_muscles_listing: { method: "POST", url: api_prefix + "targeted-muscles-list", },
    create_targeted_muscles: { method: "POST", url: api_prefix + "targeted-muscles-create", },
    update_targeted_muscles: { method: "put", url: api_prefix + "targeted-muscles-update/", },
    get_targeted_muscles: { method: "GET", url: api_prefix + "targeted-muscles-show/", },
    delete_targeted_muscles: { method: "delete", url: api_prefix + "targeted-muscles-delete/", },
    targeted_muscles_status_change: { method: "delete", url: api_prefix + "targeted-muscles-status-change", },
    targeted_muscles_delete_multiple: { method: "POST", url: api_prefix + "targeted-muscles-status-delete-many", },

    /** Masters training_muscles countries */
    training_activities_listing: { method: "POST", url: api_prefix + "training-activities-list", },
    create_training_activities: { method: "POST", url: api_prefix + "training-activities-create", headers: { headers: { 'content-type': 'multipart/form-data' } } },
    update_training_activities: { method: "post", url: api_prefix + "training-activities-update/", headers: { headers: { 'content-type': 'multipart/form-data' } } },
    get_training_activities: { method: "GET", url: api_prefix + "training-activities-show/", },
    delete_training_activities: { method: "delete", url: api_prefix + "training-activities-delete/", },
    training_activities_status_change: { method: "delete", url: api_prefix + "training-activities-status-change", },
    training_activities_delete_multiple: { method: "POST", url: api_prefix + "training-activities-status-delete-many", },

    /** Masters targeted_frequencies countries */
    targeted_frequencies_listing: { method: "POST", url: api_prefix + "targeted-frequencies-list", },
    create_targeted_frequencies: { method: "POST", url: api_prefix + "targeted-frequencies-create", },
    update_targeted_frequencies: { method: "put", url: api_prefix + "targeted-frequencies-update/", },
    get_targeted_frequencies: { method: "GET", url: api_prefix + "targeted-frequencies-show/", },
    delete_targeted_frequencies: { method: "delete", url: api_prefix + "targeted-frequencies-delete/", },
    targeted_frequencies_status_change: { method: "delete", url: api_prefix + "targeted-frequencies-status-change", },
    targeted_frequencies_delete_multiple: { method: "POST", url: api_prefix + "targeted-frequencies-status-delete-many", },

    /** Masters targeted_frequencies countries */
    training_goals_listing: { method: "POST", url: api_prefix + "training-goals-list", },
    create_training_goals: { method: "POST", url: api_prefix + "training-goals-create", },
    update_training_goals: { method: "put", url: api_prefix + "training-goals-update/", },
    get_training_goals: { method: "GET", url: api_prefix + "training-goals-show/", },
    delete_training_goals: { method: "delete", url: api_prefix + "training-goals-delete/", },
    training_goals_status_change: { method: "delete", url: api_prefix + "training-goals-status-change", },
    training_goals_delete_multiple: { method: "POST", url: api_prefix + "training-goals-status-delete-many", },

    /** Masters training_intensity countries */
    training_intensity_listing: { method: "POST", url: api_prefix + "training-intensity-list", },
    create_training_intensity: { method: "POST", url: api_prefix + "training-intensity-create", },
    update_training_intensity: { method: "put", url: api_prefix + "training-intensity-update/", },
    get_training_intensity: { method: "GET", url: api_prefix + "training-intensity-show/", },
    delete_training_intensity: { method: "delete", url: api_prefix + "training-intensity-delete/", },
    training_intensity_status_change: { method: "delete", url: api_prefix + "training-intensity-status-change", },
    training_intensity_delete_multiple: { method: "POST", url: api_prefix + "training-intensity-status-delete-many", },

    /** Masters training_type countries */
    training_type_listing: { method: "POST", url: api_prefix + "training-type-list", },
    create_training_type: { method: "POST", url: api_prefix + "training-type-create", },
    update_training_type: { method: "put", url: api_prefix + "training-type-update/", },
    get_training_type: { method: "GET", url: api_prefix + "training-type-show/", },
    delete_training_type: { method: "delete", url: api_prefix + "training-type-delete/", },
    training_type_status_change: { method: "delete", url: api_prefix + "training-type-status-change", },
    training_type_delete_multiple: { method: "POST", url: api_prefix + "training-type-status-delete-many", },

    /** Preset Programs Weeks APIs */
    preset_programs_weeks_listing: { method: "POST", url: api_prefix + "preset-programs-weeks-list", },
    create_preset_programs_weeks: { method: "POST", url: api_prefix + "preset-programs-weeks-create", },
    update_preset_programs_weeks: { method: "put", url: api_prefix + "preset-programs-weeks-update/", },
    get_preset_programs_weeks: { method: "GET", url: api_prefix + "preset-programs-weeks-show/", },
    delete_preset_programs_weeks: { method: "delete", url: api_prefix + "preset-programs-weeks-delete/", },
    preset_programs_weeks_status_change: { method: "delete", url: api_prefix + "preset-programs-weeks-status-change", },
    preset_programs_weeks_delete_multiple: { method: "POST", url: api_prefix + "preset-programs-weeks-status-delete-many", },
    preset_programs_weeks_update_sequence: { method: "POST", url: api_prefix + "preset-programs-weeks-update-sequence", },

    /** Preset Programs Weeks APIs */
    preset_programs_weeks_leps_listing: { method: "POST", url: api_prefix + "preset-programs-weeks-laps-list", },
    create_preset_programs_weeks_leps: { method: "POST", url: api_prefix + "preset-programs-weeks-laps-create", },
    update_preset_programs_weeks_leps: { method: "put", url: api_prefix + "preset-programs-weeks-laps-update/", },
    get_preset_programs_weeks_leps: { method: "GET", url: api_prefix + "preset-programs-weeks-laps-show/", },
    delete_preset_programs_weeks_leps: { method: "delete", url: api_prefix + "preset-programs-weeks-laps-delete/", },
    preset_programs_weeks_leps_status_change: { method: "delete", url: api_prefix + "preset-programs-weeks-laps-status-change", },
    preset_programs_weeks_leps_delete_multiple: { method: "POST", url: api_prefix + "preset-programs-weeks-laps-status-delete-many", },
    preset_programs_weeks_leps_update_sequence: { method: "POST", url: api_prefix + "preset-programs-weeks-laps-update-sequence", },

};
