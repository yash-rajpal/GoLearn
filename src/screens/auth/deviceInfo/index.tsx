import DeviceInfo from 'react-native-device-info';

export interface DeviceJSON {
  device_unique_id: String;
  device_model: String;
  device_id: String;
  device_system_name: String;
  device_system_version: String;
  device_bundle_id: String;
  device_build_number: String;
  device_readable_version: String;
}
const _getConstantDeviceInfo = ({
  device_unique_id,
  device_model,
  device_id,
  device_system_name,
  device_system_version,
  device_bundle_id,
  device_build_number,
  device_readable_version,
}: DeviceJSON) => {
  device_unique_id = DeviceInfo.getUniqueId();
  device_model = DeviceInfo.getModel();
  device_id = DeviceInfo.getDeviceId();
  device_system_name = DeviceInfo.getSystemName();
  device_system_version = DeviceInfo.getSystemVersion();
  device_bundle_id = DeviceInfo.getBundleId();
  device_build_number = DeviceInfo.getBuildNumber();
  device_readable_version = DeviceInfo.getReadableVersion();
  return {
    device_unique_id,
    device_model,
    device_id,
    device_system_name,
    device_system_version,
    device_bundle_id,
    device_build_number,
    device_readable_version,
  };
};

export default _getConstantDeviceInfo;
