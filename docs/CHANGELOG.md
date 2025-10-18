# Changelog

All notable changes to this project will be documented in this file.


## 2025-10-18
### Added
- N/A

### Changed
- Adjusted low-humidity threshold from 35% to 40% (lib/plant-monitor.ts).

### Fixed
- N/A

## 2025-10-17
### Added
- N/A

### Changed
- Adjusted low-humidity threshold from 40% to 35% in checkPlantCondition (lib/plant-monitor.ts). See PR #9, commit 987ff22d6947.

### Fixed
- N/A

## 2025-10-16
### Added
- N/A

### Changed
- Adjusted low-humidity classification threshold from 30% to 40% in checkPlantCondition (lib/plant-monitor.ts). See PR #7.

### Fixed
- N/A
- 
## 2025-10-15
### Added
- types: Plant — added owner: string property to Plant interface.

### Changed
- N/A

### Fixed
- N/A  
  
## 2025-10-14
### Added
- Initial docs-as-code structure
- In-memory plants store, health evaluation, 6h scheduler
- Ad-hoc tweet generator
- types: Plant — added owner: string property to Plant interface.

### Changed
- Adjusted low-humidity classification threshold from 30% to 40% in checkPlantCondition (lib/plant-monitor.ts). See PR #7.

### Fixed
- N/A
