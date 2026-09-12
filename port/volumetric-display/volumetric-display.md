A handheld persistence-of-vision display with a rotating RGB LED array.

**Status:** In development

**Focus:** PCB design, embedded control, RF, and power electronics

[Source code & hardware on GitHub](https://github.com/hyweric/Electronic-Volumetric-Display)

## Electronics

- STM32WB55 microcontroller with Bluetooth Low Energy
- 12 × 24 array: 288 RGB pixels, controlled through 1:12 multiplexed scanning
- BLDC motor drive
- Custom 2.4 GHz PCB antenna and RF matching network
- Battery charging and power-distribution circuitry; USB-C for charging and external power

## Display pipeline

The planned slicer converts 3D models into LED frames synchronized with the motor position. BLE provides control and content transfer. The platform is intended for volumetric graphics and an electronic-hourglass mode.
