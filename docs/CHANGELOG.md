# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
- Initial docs-as-code structure
- In-memory plants store, health evaluation, 6h scheduler
- Ad-hoc tweet generator
- types: Plant — added owner: string property to Plant interface.

### Changed
- Adjusted low-humidity classification threshold from 30% to 40% in checkPlantCondition (lib/plant-monitor.ts). See PR #7.

### Fixed
- N/A
