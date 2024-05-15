#!/bin/bash
# this does nothing locally.  you would add it for bitrise.io
set -ex

if [ ! -d "temp" ]
then
    mkdir temp
else
    rm -r temp
    mkdir temp
fi

touch ./temp/.env
export env_file_local_path=./temp/.env
export appcenter_config_json_file_local_path=./temp/appcenter-config.json
export google_services_json_file_local_path=temp/google-services.json
export android_keystore_file_local_path=temp/jnotes-upload-key.keystore

wget -O "$env_file_local_path" "$BITRISEIO_STAGING_ENV_URL"
echo "file downloaded to: $env_file_local_path"
envman add --key BITRISEIO_STAGING_ENV_URL --value "$env_file_local_path"

wget -O "$appcenter_config_json_file_local_path" "$BITRISEIO_APPCENTER_CONFIG_JSON_URL_URL"
echo "file downloaded to: $appcenter_config_json_file_local_path"
envman add --key BITRISEIO_APPCENTER_CONFIG_JSON_URL_URL --value "$appcenter_config_json_file_local_path"

wget -O "$google_services_json_file_local_path" "$BITRISEIO_GOOGLE_SERVICES_JSON_URL"
echo "file downloaded to: $google_services_json_file_local_path"
envman add --key BITRISEIO_GOOGLE_SERVICES_JSON_URL --value "$google_services_json_file_local_path"

wget -O "$android_keystore_file_local_path" "$BITRISEIO_ANDROID_KEYSTORE_URL"
echo "file downloaded to: $android_keystore_file_local_path"
envman add --key BITRISEIO_ANDROID_KEYSTORE_URL --value "$android_keystore_file_local_path"