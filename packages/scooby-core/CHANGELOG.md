# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.7.0 (2022-10-31)


### Bug Fixes

* add automatic retries for html screenshots ([#33](https://github.com/AnimaApp/scooby/issues/33)) and improve error reporting ([#35](https://github.com/AnimaApp/scooby/issues/35)) ([2eed87d](https://github.com/AnimaApp/scooby/commit/2eed87d5d1a1b68e212d27de4aa40b36a51ae440))
* build all CI command ([47af62a](https://github.com/AnimaApp/scooby/commit/47af62a01303fa01c96cad910a89f09adb5a688f))
* main branch reviews leaking ([#42](https://github.com/AnimaApp/scooby/issues/42)) ([b7de30d](https://github.com/AnimaApp/scooby/commit/b7de30dd05b92490c9758fd33570a09801246a27))
* rename types to shared ([670d036](https://github.com/AnimaApp/scooby/commit/670d0362f871cfca46e636561ef2b637d0327ba0))


### Features

* add approval UI ([#24](https://github.com/AnimaApp/scooby/issues/24)) ([a30b8f8](https://github.com/AnimaApp/scooby/commit/a30b8f830720d5e58859cef9db4a20c71dc68441))
* add approvals ([#20](https://github.com/AnimaApp/scooby/issues/20)) ([3b0f4ad](https://github.com/AnimaApp/scooby/commit/3b0f4adcf65819707a2d913a95583f9c91a5bc13))
* add core and types modules ([6c6581e](https://github.com/AnimaApp/scooby/commit/6c6581ef4e464d10405e4942dae059ec43b836a7))
* add forked git resolution module ([8031a4a](https://github.com/AnimaApp/scooby/commit/8031a4a2bc421cba4976ebd4e0147884758eefb7))
* add logic to upload regression report to S3 ([9a3f6fe](https://github.com/AnimaApp/scooby/commit/9a3f6fe1e6f9f42e5156ffc7ce6bd03fa3faf9be))
* add Scooby CI tests ([#6](https://github.com/AnimaApp/scooby/issues/6)) ([28a916f](https://github.com/AnimaApp/scooby/commit/28a916f4155b03fee0704b1c53cca03b8502af78))
* add Scooby deploy to GH pages ([#5](https://github.com/AnimaApp/scooby/issues/5)) ([8a94f4c](https://github.com/AnimaApp/scooby/commit/8a94f4cc039647c6207d8419a11b8dc0029b15e8))
* add steps to publish packages ([#13](https://github.com/AnimaApp/scooby/issues/13)) ([eac5e33](https://github.com/AnimaApp/scooby/commit/eac5e33b2eb2ab0974466895ae40bd5ea2e985d8))
* add threshold to fidelity test ([#36](https://github.com/AnimaApp/scooby/issues/36)) ([d48c9b8](https://github.com/AnimaApp/scooby/commit/d48c9b8ec5530a5125a80869dae4a77df45d3840))
* **core:** add image diffing algorithms ([73a16e0](https://github.com/AnimaApp/scooby/commit/73a16e07defd2c5868aa5df9ba078b200a5b5fc4))
* **core:** add new loader mode for nested structure with multiple files ([#16](https://github.com/AnimaApp/scooby/issues/16)) ([4b36553](https://github.com/AnimaApp/scooby/commit/4b365538d61fc27684504516422c37ccadcca98c))
* **core:** implement image source loaders ([3a7f536](https://github.com/AnimaApp/scooby/commit/3a7f536e6e4a0c5e62c0f8ffd08172b9d5d0cacb))
* **core:** implement regression logic ([297b956](https://github.com/AnimaApp/scooby/commit/297b9567bd640e74d8924a5d0e7360436b73104e))
* **core:** improve report interface and logic ([#18](https://github.com/AnimaApp/scooby/issues/18)) ([9ebb68b](https://github.com/AnimaApp/scooby/commit/9ebb68bccaaf78e7d78c44eff16a8857d9f27a5a))
* drop git-resolver module in favor of an easier approach ([91eb5cf](https://github.com/AnimaApp/scooby/commit/91eb5cf51af07b6d042bb62353c725c066eafa61))
* implement API approvals ([#23](https://github.com/AnimaApp/scooby/issues/23)) ([824b437](https://github.com/AnimaApp/scooby/commit/824b43752ad412fafaf75c4d6f76a85a08b78cdf))
* implement fidelity report ([#10](https://github.com/AnimaApp/scooby/issues/10)) ([a66c78b](https://github.com/AnimaApp/scooby/commit/a66c78b327094c7759a414300900d29988a19374))
* implement github commit status update ([#12](https://github.com/AnimaApp/scooby/issues/12)) ([3ddd90d](https://github.com/AnimaApp/scooby/commit/3ddd90dbabc6e38498a56dccdc213772e73ee5dc))
* implement loaders ([285014d](https://github.com/AnimaApp/scooby/commit/285014d96a7cd2022cebd0dfde348cbadc12862d))
* implement regression reference commit backtracking ([#30](https://github.com/AnimaApp/scooby/issues/30)) ([9019adf](https://github.com/AnimaApp/scooby/commit/9019adf1d6a97c22b2391fa480e9f474962e4f2e))
* implement regression test upload/download mechanism ([99d1ab9](https://github.com/AnimaApp/scooby/commit/99d1ab9ae25e6d0bd792dc1289e1e328bf992a3e))
* implement web ui ([#3](https://github.com/AnimaApp/scooby/issues/3)) ([c4768bd](https://github.com/AnimaApp/scooby/commit/c4768bd65bacf893469701e1103fbb5ce180f71a))
* improve git resolver ([4e1b760](https://github.com/AnimaApp/scooby/commit/4e1b760669b2bb547cb2088eced497e4fa2f05cf))
* improve regression test flow ([602c63a](https://github.com/AnimaApp/scooby/commit/602c63a10686c276021e5c75bbb60847f3f7cae2))
* introduce code-based reports ([#32](https://github.com/AnimaApp/scooby/issues/32)) ([0a2c805](https://github.com/AnimaApp/scooby/commit/0a2c805bcbfe8cdd8b65b0bd553fcb290142a607))
* progress in the API implementation ([5a10963](https://github.com/AnimaApp/scooby/commit/5a109635ed23731f3de680687afda687757b74b2))





# 1.6.0 (2022-10-28)


### Bug Fixes

* add automatic retries for html screenshots ([#33](https://github.com/AnimaApp/scooby/issues/33)) and improve error reporting ([#35](https://github.com/AnimaApp/scooby/issues/35)) ([2eed87d](https://github.com/AnimaApp/scooby/commit/2eed87d5d1a1b68e212d27de4aa40b36a51ae440))
* build all CI command ([47af62a](https://github.com/AnimaApp/scooby/commit/47af62a01303fa01c96cad910a89f09adb5a688f))
* rename types to shared ([670d036](https://github.com/AnimaApp/scooby/commit/670d0362f871cfca46e636561ef2b637d0327ba0))


### Features

* add approval UI ([#24](https://github.com/AnimaApp/scooby/issues/24)) ([a30b8f8](https://github.com/AnimaApp/scooby/commit/a30b8f830720d5e58859cef9db4a20c71dc68441))
* add approvals ([#20](https://github.com/AnimaApp/scooby/issues/20)) ([3b0f4ad](https://github.com/AnimaApp/scooby/commit/3b0f4adcf65819707a2d913a95583f9c91a5bc13))
* add core and types modules ([6c6581e](https://github.com/AnimaApp/scooby/commit/6c6581ef4e464d10405e4942dae059ec43b836a7))
* add forked git resolution module ([8031a4a](https://github.com/AnimaApp/scooby/commit/8031a4a2bc421cba4976ebd4e0147884758eefb7))
* add logic to upload regression report to S3 ([9a3f6fe](https://github.com/AnimaApp/scooby/commit/9a3f6fe1e6f9f42e5156ffc7ce6bd03fa3faf9be))
* add Scooby CI tests ([#6](https://github.com/AnimaApp/scooby/issues/6)) ([28a916f](https://github.com/AnimaApp/scooby/commit/28a916f4155b03fee0704b1c53cca03b8502af78))
* add Scooby deploy to GH pages ([#5](https://github.com/AnimaApp/scooby/issues/5)) ([8a94f4c](https://github.com/AnimaApp/scooby/commit/8a94f4cc039647c6207d8419a11b8dc0029b15e8))
* add steps to publish packages ([#13](https://github.com/AnimaApp/scooby/issues/13)) ([eac5e33](https://github.com/AnimaApp/scooby/commit/eac5e33b2eb2ab0974466895ae40bd5ea2e985d8))
* add threshold to fidelity test ([#36](https://github.com/AnimaApp/scooby/issues/36)) ([d48c9b8](https://github.com/AnimaApp/scooby/commit/d48c9b8ec5530a5125a80869dae4a77df45d3840))
* **core:** add image diffing algorithms ([73a16e0](https://github.com/AnimaApp/scooby/commit/73a16e07defd2c5868aa5df9ba078b200a5b5fc4))
* **core:** add new loader mode for nested structure with multiple files ([#16](https://github.com/AnimaApp/scooby/issues/16)) ([4b36553](https://github.com/AnimaApp/scooby/commit/4b365538d61fc27684504516422c37ccadcca98c))
* **core:** implement image source loaders ([3a7f536](https://github.com/AnimaApp/scooby/commit/3a7f536e6e4a0c5e62c0f8ffd08172b9d5d0cacb))
* **core:** implement regression logic ([297b956](https://github.com/AnimaApp/scooby/commit/297b9567bd640e74d8924a5d0e7360436b73104e))
* **core:** improve report interface and logic ([#18](https://github.com/AnimaApp/scooby/issues/18)) ([9ebb68b](https://github.com/AnimaApp/scooby/commit/9ebb68bccaaf78e7d78c44eff16a8857d9f27a5a))
* drop git-resolver module in favor of an easier approach ([91eb5cf](https://github.com/AnimaApp/scooby/commit/91eb5cf51af07b6d042bb62353c725c066eafa61))
* implement API approvals ([#23](https://github.com/AnimaApp/scooby/issues/23)) ([824b437](https://github.com/AnimaApp/scooby/commit/824b43752ad412fafaf75c4d6f76a85a08b78cdf))
* implement fidelity report ([#10](https://github.com/AnimaApp/scooby/issues/10)) ([a66c78b](https://github.com/AnimaApp/scooby/commit/a66c78b327094c7759a414300900d29988a19374))
* implement github commit status update ([#12](https://github.com/AnimaApp/scooby/issues/12)) ([3ddd90d](https://github.com/AnimaApp/scooby/commit/3ddd90dbabc6e38498a56dccdc213772e73ee5dc))
* implement loaders ([285014d](https://github.com/AnimaApp/scooby/commit/285014d96a7cd2022cebd0dfde348cbadc12862d))
* implement regression reference commit backtracking ([#30](https://github.com/AnimaApp/scooby/issues/30)) ([9019adf](https://github.com/AnimaApp/scooby/commit/9019adf1d6a97c22b2391fa480e9f474962e4f2e))
* implement regression test upload/download mechanism ([99d1ab9](https://github.com/AnimaApp/scooby/commit/99d1ab9ae25e6d0bd792dc1289e1e328bf992a3e))
* implement web ui ([#3](https://github.com/AnimaApp/scooby/issues/3)) ([c4768bd](https://github.com/AnimaApp/scooby/commit/c4768bd65bacf893469701e1103fbb5ce180f71a))
* improve git resolver ([4e1b760](https://github.com/AnimaApp/scooby/commit/4e1b760669b2bb547cb2088eced497e4fa2f05cf))
* improve regression test flow ([602c63a](https://github.com/AnimaApp/scooby/commit/602c63a10686c276021e5c75bbb60847f3f7cae2))
* introduce code-based reports ([#32](https://github.com/AnimaApp/scooby/issues/32)) ([0a2c805](https://github.com/AnimaApp/scooby/commit/0a2c805bcbfe8cdd8b65b0bd553fcb290142a607))
* progress in the API implementation ([5a10963](https://github.com/AnimaApp/scooby/commit/5a109635ed23731f3de680687afda687757b74b2))





# 1.5.0 (2022-10-28)


### Bug Fixes

* add automatic retries for html screenshots ([#33](https://github.com/AnimaApp/scooby/issues/33)) and improve error reporting ([#35](https://github.com/AnimaApp/scooby/issues/35)) ([2eed87d](https://github.com/AnimaApp/scooby/commit/2eed87d5d1a1b68e212d27de4aa40b36a51ae440))
* build all CI command ([47af62a](https://github.com/AnimaApp/scooby/commit/47af62a01303fa01c96cad910a89f09adb5a688f))
* rename types to shared ([670d036](https://github.com/AnimaApp/scooby/commit/670d0362f871cfca46e636561ef2b637d0327ba0))


### Features

* add approval UI ([#24](https://github.com/AnimaApp/scooby/issues/24)) ([a30b8f8](https://github.com/AnimaApp/scooby/commit/a30b8f830720d5e58859cef9db4a20c71dc68441))
* add approvals ([#20](https://github.com/AnimaApp/scooby/issues/20)) ([3b0f4ad](https://github.com/AnimaApp/scooby/commit/3b0f4adcf65819707a2d913a95583f9c91a5bc13))
* add core and types modules ([6c6581e](https://github.com/AnimaApp/scooby/commit/6c6581ef4e464d10405e4942dae059ec43b836a7))
* add forked git resolution module ([8031a4a](https://github.com/AnimaApp/scooby/commit/8031a4a2bc421cba4976ebd4e0147884758eefb7))
* add logic to upload regression report to S3 ([9a3f6fe](https://github.com/AnimaApp/scooby/commit/9a3f6fe1e6f9f42e5156ffc7ce6bd03fa3faf9be))
* add Scooby CI tests ([#6](https://github.com/AnimaApp/scooby/issues/6)) ([28a916f](https://github.com/AnimaApp/scooby/commit/28a916f4155b03fee0704b1c53cca03b8502af78))
* add Scooby deploy to GH pages ([#5](https://github.com/AnimaApp/scooby/issues/5)) ([8a94f4c](https://github.com/AnimaApp/scooby/commit/8a94f4cc039647c6207d8419a11b8dc0029b15e8))
* add steps to publish packages ([#13](https://github.com/AnimaApp/scooby/issues/13)) ([eac5e33](https://github.com/AnimaApp/scooby/commit/eac5e33b2eb2ab0974466895ae40bd5ea2e985d8))
* add threshold to fidelity test ([#36](https://github.com/AnimaApp/scooby/issues/36)) ([d48c9b8](https://github.com/AnimaApp/scooby/commit/d48c9b8ec5530a5125a80869dae4a77df45d3840))
* **core:** add image diffing algorithms ([73a16e0](https://github.com/AnimaApp/scooby/commit/73a16e07defd2c5868aa5df9ba078b200a5b5fc4))
* **core:** add new loader mode for nested structure with multiple files ([#16](https://github.com/AnimaApp/scooby/issues/16)) ([4b36553](https://github.com/AnimaApp/scooby/commit/4b365538d61fc27684504516422c37ccadcca98c))
* **core:** implement image source loaders ([3a7f536](https://github.com/AnimaApp/scooby/commit/3a7f536e6e4a0c5e62c0f8ffd08172b9d5d0cacb))
* **core:** implement regression logic ([297b956](https://github.com/AnimaApp/scooby/commit/297b9567bd640e74d8924a5d0e7360436b73104e))
* **core:** improve report interface and logic ([#18](https://github.com/AnimaApp/scooby/issues/18)) ([9ebb68b](https://github.com/AnimaApp/scooby/commit/9ebb68bccaaf78e7d78c44eff16a8857d9f27a5a))
* drop git-resolver module in favor of an easier approach ([91eb5cf](https://github.com/AnimaApp/scooby/commit/91eb5cf51af07b6d042bb62353c725c066eafa61))
* implement API approvals ([#23](https://github.com/AnimaApp/scooby/issues/23)) ([824b437](https://github.com/AnimaApp/scooby/commit/824b43752ad412fafaf75c4d6f76a85a08b78cdf))
* implement fidelity report ([#10](https://github.com/AnimaApp/scooby/issues/10)) ([a66c78b](https://github.com/AnimaApp/scooby/commit/a66c78b327094c7759a414300900d29988a19374))
* implement github commit status update ([#12](https://github.com/AnimaApp/scooby/issues/12)) ([3ddd90d](https://github.com/AnimaApp/scooby/commit/3ddd90dbabc6e38498a56dccdc213772e73ee5dc))
* implement loaders ([285014d](https://github.com/AnimaApp/scooby/commit/285014d96a7cd2022cebd0dfde348cbadc12862d))
* implement regression reference commit backtracking ([#30](https://github.com/AnimaApp/scooby/issues/30)) ([9019adf](https://github.com/AnimaApp/scooby/commit/9019adf1d6a97c22b2391fa480e9f474962e4f2e))
* implement regression test upload/download mechanism ([99d1ab9](https://github.com/AnimaApp/scooby/commit/99d1ab9ae25e6d0bd792dc1289e1e328bf992a3e))
* implement web ui ([#3](https://github.com/AnimaApp/scooby/issues/3)) ([c4768bd](https://github.com/AnimaApp/scooby/commit/c4768bd65bacf893469701e1103fbb5ce180f71a))
* improve git resolver ([4e1b760](https://github.com/AnimaApp/scooby/commit/4e1b760669b2bb547cb2088eced497e4fa2f05cf))
* improve regression test flow ([602c63a](https://github.com/AnimaApp/scooby/commit/602c63a10686c276021e5c75bbb60847f3f7cae2))
* introduce code-based reports ([#32](https://github.com/AnimaApp/scooby/issues/32)) ([0a2c805](https://github.com/AnimaApp/scooby/commit/0a2c805bcbfe8cdd8b65b0bd553fcb290142a607))
* progress in the API implementation ([5a10963](https://github.com/AnimaApp/scooby/commit/5a109635ed23731f3de680687afda687757b74b2))





# 1.4.0 (2022-10-24)


### Bug Fixes

* build all CI command ([47af62a](https://github.com/AnimaApp/scooby/commit/47af62a01303fa01c96cad910a89f09adb5a688f))
* rename types to shared ([670d036](https://github.com/AnimaApp/scooby/commit/670d0362f871cfca46e636561ef2b637d0327ba0))


### Features

* add approval UI ([#24](https://github.com/AnimaApp/scooby/issues/24)) ([a30b8f8](https://github.com/AnimaApp/scooby/commit/a30b8f830720d5e58859cef9db4a20c71dc68441))
* add approvals ([#20](https://github.com/AnimaApp/scooby/issues/20)) ([3b0f4ad](https://github.com/AnimaApp/scooby/commit/3b0f4adcf65819707a2d913a95583f9c91a5bc13))
* add core and types modules ([6c6581e](https://github.com/AnimaApp/scooby/commit/6c6581ef4e464d10405e4942dae059ec43b836a7))
* add forked git resolution module ([8031a4a](https://github.com/AnimaApp/scooby/commit/8031a4a2bc421cba4976ebd4e0147884758eefb7))
* add logic to upload regression report to S3 ([9a3f6fe](https://github.com/AnimaApp/scooby/commit/9a3f6fe1e6f9f42e5156ffc7ce6bd03fa3faf9be))
* add Scooby CI tests ([#6](https://github.com/AnimaApp/scooby/issues/6)) ([28a916f](https://github.com/AnimaApp/scooby/commit/28a916f4155b03fee0704b1c53cca03b8502af78))
* add Scooby deploy to GH pages ([#5](https://github.com/AnimaApp/scooby/issues/5)) ([8a94f4c](https://github.com/AnimaApp/scooby/commit/8a94f4cc039647c6207d8419a11b8dc0029b15e8))
* add steps to publish packages ([#13](https://github.com/AnimaApp/scooby/issues/13)) ([eac5e33](https://github.com/AnimaApp/scooby/commit/eac5e33b2eb2ab0974466895ae40bd5ea2e985d8))
* **core:** add image diffing algorithms ([73a16e0](https://github.com/AnimaApp/scooby/commit/73a16e07defd2c5868aa5df9ba078b200a5b5fc4))
* **core:** add new loader mode for nested structure with multiple files ([#16](https://github.com/AnimaApp/scooby/issues/16)) ([4b36553](https://github.com/AnimaApp/scooby/commit/4b365538d61fc27684504516422c37ccadcca98c))
* **core:** implement image source loaders ([3a7f536](https://github.com/AnimaApp/scooby/commit/3a7f536e6e4a0c5e62c0f8ffd08172b9d5d0cacb))
* **core:** implement regression logic ([297b956](https://github.com/AnimaApp/scooby/commit/297b9567bd640e74d8924a5d0e7360436b73104e))
* **core:** improve report interface and logic ([#18](https://github.com/AnimaApp/scooby/issues/18)) ([9ebb68b](https://github.com/AnimaApp/scooby/commit/9ebb68bccaaf78e7d78c44eff16a8857d9f27a5a))
* drop git-resolver module in favor of an easier approach ([91eb5cf](https://github.com/AnimaApp/scooby/commit/91eb5cf51af07b6d042bb62353c725c066eafa61))
* implement API approvals ([#23](https://github.com/AnimaApp/scooby/issues/23)) ([824b437](https://github.com/AnimaApp/scooby/commit/824b43752ad412fafaf75c4d6f76a85a08b78cdf))
* implement fidelity report ([#10](https://github.com/AnimaApp/scooby/issues/10)) ([a66c78b](https://github.com/AnimaApp/scooby/commit/a66c78b327094c7759a414300900d29988a19374))
* implement github commit status update ([#12](https://github.com/AnimaApp/scooby/issues/12)) ([3ddd90d](https://github.com/AnimaApp/scooby/commit/3ddd90dbabc6e38498a56dccdc213772e73ee5dc))
* implement loaders ([285014d](https://github.com/AnimaApp/scooby/commit/285014d96a7cd2022cebd0dfde348cbadc12862d))
* implement regression test upload/download mechanism ([99d1ab9](https://github.com/AnimaApp/scooby/commit/99d1ab9ae25e6d0bd792dc1289e1e328bf992a3e))
* implement web ui ([#3](https://github.com/AnimaApp/scooby/issues/3)) ([c4768bd](https://github.com/AnimaApp/scooby/commit/c4768bd65bacf893469701e1103fbb5ce180f71a))
* improve git resolver ([4e1b760](https://github.com/AnimaApp/scooby/commit/4e1b760669b2bb547cb2088eced497e4fa2f05cf))
* improve regression test flow ([602c63a](https://github.com/AnimaApp/scooby/commit/602c63a10686c276021e5c75bbb60847f3f7cae2))
* progress in the API implementation ([5a10963](https://github.com/AnimaApp/scooby/commit/5a109635ed23731f3de680687afda687757b74b2))





# 1.3.0 (2022-10-20)


### Bug Fixes

* build all CI command ([47af62a](https://github.com/AnimaApp/scooby/commit/47af62a01303fa01c96cad910a89f09adb5a688f))
* rename types to shared ([670d036](https://github.com/AnimaApp/scooby/commit/670d0362f871cfca46e636561ef2b637d0327ba0))


### Features

* add approvals ([#20](https://github.com/AnimaApp/scooby/issues/20)) ([3b0f4ad](https://github.com/AnimaApp/scooby/commit/3b0f4adcf65819707a2d913a95583f9c91a5bc13))
* add core and types modules ([6c6581e](https://github.com/AnimaApp/scooby/commit/6c6581ef4e464d10405e4942dae059ec43b836a7))
* add forked git resolution module ([8031a4a](https://github.com/AnimaApp/scooby/commit/8031a4a2bc421cba4976ebd4e0147884758eefb7))
* add logic to upload regression report to S3 ([9a3f6fe](https://github.com/AnimaApp/scooby/commit/9a3f6fe1e6f9f42e5156ffc7ce6bd03fa3faf9be))
* add Scooby CI tests ([#6](https://github.com/AnimaApp/scooby/issues/6)) ([28a916f](https://github.com/AnimaApp/scooby/commit/28a916f4155b03fee0704b1c53cca03b8502af78))
* add Scooby deploy to GH pages ([#5](https://github.com/AnimaApp/scooby/issues/5)) ([8a94f4c](https://github.com/AnimaApp/scooby/commit/8a94f4cc039647c6207d8419a11b8dc0029b15e8))
* add steps to publish packages ([#13](https://github.com/AnimaApp/scooby/issues/13)) ([eac5e33](https://github.com/AnimaApp/scooby/commit/eac5e33b2eb2ab0974466895ae40bd5ea2e985d8))
* **core:** add image diffing algorithms ([73a16e0](https://github.com/AnimaApp/scooby/commit/73a16e07defd2c5868aa5df9ba078b200a5b5fc4))
* **core:** add new loader mode for nested structure with multiple files ([#16](https://github.com/AnimaApp/scooby/issues/16)) ([4b36553](https://github.com/AnimaApp/scooby/commit/4b365538d61fc27684504516422c37ccadcca98c))
* **core:** implement image source loaders ([3a7f536](https://github.com/AnimaApp/scooby/commit/3a7f536e6e4a0c5e62c0f8ffd08172b9d5d0cacb))
* **core:** implement regression logic ([297b956](https://github.com/AnimaApp/scooby/commit/297b9567bd640e74d8924a5d0e7360436b73104e))
* **core:** improve report interface and logic ([#18](https://github.com/AnimaApp/scooby/issues/18)) ([9ebb68b](https://github.com/AnimaApp/scooby/commit/9ebb68bccaaf78e7d78c44eff16a8857d9f27a5a))
* drop git-resolver module in favor of an easier approach ([91eb5cf](https://github.com/AnimaApp/scooby/commit/91eb5cf51af07b6d042bb62353c725c066eafa61))
* implement fidelity report ([#10](https://github.com/AnimaApp/scooby/issues/10)) ([a66c78b](https://github.com/AnimaApp/scooby/commit/a66c78b327094c7759a414300900d29988a19374))
* implement github commit status update ([#12](https://github.com/AnimaApp/scooby/issues/12)) ([3ddd90d](https://github.com/AnimaApp/scooby/commit/3ddd90dbabc6e38498a56dccdc213772e73ee5dc))
* implement loaders ([285014d](https://github.com/AnimaApp/scooby/commit/285014d96a7cd2022cebd0dfde348cbadc12862d))
* implement regression test upload/download mechanism ([99d1ab9](https://github.com/AnimaApp/scooby/commit/99d1ab9ae25e6d0bd792dc1289e1e328bf992a3e))
* implement web ui ([#3](https://github.com/AnimaApp/scooby/issues/3)) ([c4768bd](https://github.com/AnimaApp/scooby/commit/c4768bd65bacf893469701e1103fbb5ce180f71a))
* improve git resolver ([4e1b760](https://github.com/AnimaApp/scooby/commit/4e1b760669b2bb547cb2088eced497e4fa2f05cf))
* improve regression test flow ([602c63a](https://github.com/AnimaApp/scooby/commit/602c63a10686c276021e5c75bbb60847f3f7cae2))
* progress in the API implementation ([5a10963](https://github.com/AnimaApp/scooby/commit/5a109635ed23731f3de680687afda687757b74b2))





# 1.2.0 (2022-10-19)


### Bug Fixes

* build all CI command ([47af62a](https://github.com/AnimaApp/scooby/commit/47af62a01303fa01c96cad910a89f09adb5a688f))
* rename types to shared ([670d036](https://github.com/AnimaApp/scooby/commit/670d0362f871cfca46e636561ef2b637d0327ba0))


### Features

* add core and types modules ([6c6581e](https://github.com/AnimaApp/scooby/commit/6c6581ef4e464d10405e4942dae059ec43b836a7))
* add forked git resolution module ([8031a4a](https://github.com/AnimaApp/scooby/commit/8031a4a2bc421cba4976ebd4e0147884758eefb7))
* add logic to upload regression report to S3 ([9a3f6fe](https://github.com/AnimaApp/scooby/commit/9a3f6fe1e6f9f42e5156ffc7ce6bd03fa3faf9be))
* add Scooby CI tests ([#6](https://github.com/AnimaApp/scooby/issues/6)) ([28a916f](https://github.com/AnimaApp/scooby/commit/28a916f4155b03fee0704b1c53cca03b8502af78))
* add Scooby deploy to GH pages ([#5](https://github.com/AnimaApp/scooby/issues/5)) ([8a94f4c](https://github.com/AnimaApp/scooby/commit/8a94f4cc039647c6207d8419a11b8dc0029b15e8))
* add steps to publish packages ([#13](https://github.com/AnimaApp/scooby/issues/13)) ([eac5e33](https://github.com/AnimaApp/scooby/commit/eac5e33b2eb2ab0974466895ae40bd5ea2e985d8))
* **core:** add image diffing algorithms ([73a16e0](https://github.com/AnimaApp/scooby/commit/73a16e07defd2c5868aa5df9ba078b200a5b5fc4))
* **core:** add new loader mode for nested structure with multiple files ([#16](https://github.com/AnimaApp/scooby/issues/16)) ([4b36553](https://github.com/AnimaApp/scooby/commit/4b365538d61fc27684504516422c37ccadcca98c))
* **core:** implement image source loaders ([3a7f536](https://github.com/AnimaApp/scooby/commit/3a7f536e6e4a0c5e62c0f8ffd08172b9d5d0cacb))
* **core:** implement regression logic ([297b956](https://github.com/AnimaApp/scooby/commit/297b9567bd640e74d8924a5d0e7360436b73104e))
* **core:** improve report interface and logic ([#18](https://github.com/AnimaApp/scooby/issues/18)) ([9ebb68b](https://github.com/AnimaApp/scooby/commit/9ebb68bccaaf78e7d78c44eff16a8857d9f27a5a))
* drop git-resolver module in favor of an easier approach ([91eb5cf](https://github.com/AnimaApp/scooby/commit/91eb5cf51af07b6d042bb62353c725c066eafa61))
* implement fidelity report ([#10](https://github.com/AnimaApp/scooby/issues/10)) ([a66c78b](https://github.com/AnimaApp/scooby/commit/a66c78b327094c7759a414300900d29988a19374))
* implement github commit status update ([#12](https://github.com/AnimaApp/scooby/issues/12)) ([3ddd90d](https://github.com/AnimaApp/scooby/commit/3ddd90dbabc6e38498a56dccdc213772e73ee5dc))
* implement loaders ([285014d](https://github.com/AnimaApp/scooby/commit/285014d96a7cd2022cebd0dfde348cbadc12862d))
* implement regression test upload/download mechanism ([99d1ab9](https://github.com/AnimaApp/scooby/commit/99d1ab9ae25e6d0bd792dc1289e1e328bf992a3e))
* implement web ui ([#3](https://github.com/AnimaApp/scooby/issues/3)) ([c4768bd](https://github.com/AnimaApp/scooby/commit/c4768bd65bacf893469701e1103fbb5ce180f71a))
* improve git resolver ([4e1b760](https://github.com/AnimaApp/scooby/commit/4e1b760669b2bb547cb2088eced497e4fa2f05cf))
* improve regression test flow ([602c63a](https://github.com/AnimaApp/scooby/commit/602c63a10686c276021e5c75bbb60847f3f7cae2))
* progress in the API implementation ([5a10963](https://github.com/AnimaApp/scooby/commit/5a109635ed23731f3de680687afda687757b74b2))





# 1.1.0 (2022-10-14)


### Bug Fixes

* build all CI command ([47af62a](https://github.com/AnimaApp/scooby/commit/47af62a01303fa01c96cad910a89f09adb5a688f))
* rename types to shared ([670d036](https://github.com/AnimaApp/scooby/commit/670d0362f871cfca46e636561ef2b637d0327ba0))


### Features

* add core and types modules ([6c6581e](https://github.com/AnimaApp/scooby/commit/6c6581ef4e464d10405e4942dae059ec43b836a7))
* add forked git resolution module ([8031a4a](https://github.com/AnimaApp/scooby/commit/8031a4a2bc421cba4976ebd4e0147884758eefb7))
* add logic to upload regression report to S3 ([9a3f6fe](https://github.com/AnimaApp/scooby/commit/9a3f6fe1e6f9f42e5156ffc7ce6bd03fa3faf9be))
* add Scooby CI tests ([#6](https://github.com/AnimaApp/scooby/issues/6)) ([28a916f](https://github.com/AnimaApp/scooby/commit/28a916f4155b03fee0704b1c53cca03b8502af78))
* add Scooby deploy to GH pages ([#5](https://github.com/AnimaApp/scooby/issues/5)) ([8a94f4c](https://github.com/AnimaApp/scooby/commit/8a94f4cc039647c6207d8419a11b8dc0029b15e8))
* add steps to publish packages ([#13](https://github.com/AnimaApp/scooby/issues/13)) ([eac5e33](https://github.com/AnimaApp/scooby/commit/eac5e33b2eb2ab0974466895ae40bd5ea2e985d8))
* **core:** add image diffing algorithms ([73a16e0](https://github.com/AnimaApp/scooby/commit/73a16e07defd2c5868aa5df9ba078b200a5b5fc4))
* **core:** implement image source loaders ([3a7f536](https://github.com/AnimaApp/scooby/commit/3a7f536e6e4a0c5e62c0f8ffd08172b9d5d0cacb))
* **core:** implement regression logic ([297b956](https://github.com/AnimaApp/scooby/commit/297b9567bd640e74d8924a5d0e7360436b73104e))
* drop git-resolver module in favor of an easier approach ([91eb5cf](https://github.com/AnimaApp/scooby/commit/91eb5cf51af07b6d042bb62353c725c066eafa61))
* implement fidelity report ([#10](https://github.com/AnimaApp/scooby/issues/10)) ([a66c78b](https://github.com/AnimaApp/scooby/commit/a66c78b327094c7759a414300900d29988a19374))
* implement github commit status update ([#12](https://github.com/AnimaApp/scooby/issues/12)) ([3ddd90d](https://github.com/AnimaApp/scooby/commit/3ddd90dbabc6e38498a56dccdc213772e73ee5dc))
* implement loaders ([285014d](https://github.com/AnimaApp/scooby/commit/285014d96a7cd2022cebd0dfde348cbadc12862d))
* implement regression test upload/download mechanism ([99d1ab9](https://github.com/AnimaApp/scooby/commit/99d1ab9ae25e6d0bd792dc1289e1e328bf992a3e))
* implement web ui ([#3](https://github.com/AnimaApp/scooby/issues/3)) ([c4768bd](https://github.com/AnimaApp/scooby/commit/c4768bd65bacf893469701e1103fbb5ce180f71a))
* improve git resolver ([4e1b760](https://github.com/AnimaApp/scooby/commit/4e1b760669b2bb547cb2088eced497e4fa2f05cf))
* improve regression test flow ([602c63a](https://github.com/AnimaApp/scooby/commit/602c63a10686c276021e5c75bbb60847f3f7cae2))
* progress in the API implementation ([5a10963](https://github.com/AnimaApp/scooby/commit/5a109635ed23731f3de680687afda687757b74b2))
