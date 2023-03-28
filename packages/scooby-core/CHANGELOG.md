# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.24.0 (2023-03-28)


### Bug Fixes

* add automatic retries for html screenshots ([#33](https://github.com/AnimaApp/scooby/issues/33)) and improve error reporting ([#35](https://github.com/AnimaApp/scooby/issues/35)) ([2eed87d](https://github.com/AnimaApp/scooby/commit/2eed87d5d1a1b68e212d27de4aa40b36a51ae440))
* build all CI command ([47af62a](https://github.com/AnimaApp/scooby/commit/47af62a01303fa01c96cad910a89f09adb5a688f))
* **core:** fix regression reference backtracking not considering base commit ([#83](https://github.com/AnimaApp/scooby/issues/83)) ([521e383](https://github.com/AnimaApp/scooby/commit/521e383f98ae24b81da60dafc17d5a9b16922697))
* **core:** increase code diff buffer ([#80](https://github.com/AnimaApp/scooby/issues/80)) ([797886b](https://github.com/AnimaApp/scooby/commit/797886bb1c24c5891e3c3550330e587d351dafb0))
* main branch reviews leaking ([#42](https://github.com/AnimaApp/scooby/issues/42)) ([b7de30d](https://github.com/AnimaApp/scooby/commit/b7de30dd05b92490c9758fd33570a09801246a27))
* make flexible matching case insensitive ([#88](https://github.com/AnimaApp/scooby/issues/88)) ([2920799](https://github.com/AnimaApp/scooby/commit/2920799000f3b289de36b46fa1e73c6e0dc9c3ba))
* rename types to shared ([670d036](https://github.com/AnimaApp/scooby/commit/670d0362f871cfca46e636561ef2b637d0327ba0))
* screenshot timeout ([#55](https://github.com/AnimaApp/scooby/issues/55)) ([19190d5](https://github.com/AnimaApp/scooby/commit/19190d5d4f173a3b5e644470b14e536f9098c848))


### Features

* add approval UI ([#24](https://github.com/AnimaApp/scooby/issues/24)) ([a30b8f8](https://github.com/AnimaApp/scooby/commit/a30b8f830720d5e58859cef9db4a20c71dc68441))
* add approvals ([#20](https://github.com/AnimaApp/scooby/issues/20)) ([3b0f4ad](https://github.com/AnimaApp/scooby/commit/3b0f4adcf65819707a2d913a95583f9c91a5bc13))
* add core and types modules ([6c6581e](https://github.com/AnimaApp/scooby/commit/6c6581ef4e464d10405e4942dae059ec43b836a7))
* Add dataset type option ([#94](https://github.com/AnimaApp/scooby/issues/94)) ([50f125c](https://github.com/AnimaApp/scooby/commit/50f125c928987cff0896063ba67e7717ed4064ad))
* add fidelity-regression report ([#76](https://github.com/AnimaApp/scooby/issues/76)) ([97ff50b](https://github.com/AnimaApp/scooby/commit/97ff50b52ec9fea5e749e1bdb09778d5c1844620))
* add forked git resolution module ([8031a4a](https://github.com/AnimaApp/scooby/commit/8031a4a2bc421cba4976ebd4e0147884758eefb7))
* add logic to upload regression report to S3 ([9a3f6fe](https://github.com/AnimaApp/scooby/commit/9a3f6fe1e6f9f42e5156ffc7ce6bd03fa3faf9be))
* add Scooby CI tests ([#6](https://github.com/AnimaApp/scooby/issues/6)) ([28a916f](https://github.com/AnimaApp/scooby/commit/28a916f4155b03fee0704b1c53cca03b8502af78))
* add Scooby deploy to GH pages ([#5](https://github.com/AnimaApp/scooby/issues/5)) ([8a94f4c](https://github.com/AnimaApp/scooby/commit/8a94f4cc039647c6207d8419a11b8dc0029b15e8))
* add steps to publish packages ([#13](https://github.com/AnimaApp/scooby/issues/13)) ([eac5e33](https://github.com/AnimaApp/scooby/commit/eac5e33b2eb2ab0974466895ae40bd5ea2e985d8))
* add support for different file types ([#63](https://github.com/AnimaApp/scooby/issues/63)) ([e642bb0](https://github.com/AnimaApp/scooby/commit/e642bb0fa6f3c5da9d0f7f6bd696869029b766a7))
* add support for metadata fields ([#53](https://github.com/AnimaApp/scooby/issues/53)) ([243ab27](https://github.com/AnimaApp/scooby/commit/243ab2773dee551f0c82ed195bc38a33f2a0607f))
* add support for multiple file types ([#92](https://github.com/AnimaApp/scooby/issues/92)) ([ecdb799](https://github.com/AnimaApp/scooby/commit/ecdb799e53826295ae9637386f0117884bca48b6))
* add support for ZIP archives ([#72](https://github.com/AnimaApp/scooby/issues/72)) ([dc18721](https://github.com/AnimaApp/scooby/commit/dc18721957fecd7b1feb803940506ec758351bfa))
* add threshold to fidelity test ([#36](https://github.com/AnimaApp/scooby/issues/36)) ([d48c9b8](https://github.com/AnimaApp/scooby/commit/d48c9b8ec5530a5125a80869dae4a77df45d3840))
* **core:** add flexible matching strategy ([#84](https://github.com/AnimaApp/scooby/issues/84)) ([943679b](https://github.com/AnimaApp/scooby/commit/943679ba891ac371fdd47f44de4bc7ff3bdb7085))
* **core:** add image diffing algorithms ([73a16e0](https://github.com/AnimaApp/scooby/commit/73a16e07defd2c5868aa5df9ba078b200a5b5fc4))
* **core:** add new loader mode for nested structure with multiple files ([#16](https://github.com/AnimaApp/scooby/issues/16)) ([4b36553](https://github.com/AnimaApp/scooby/commit/4b365538d61fc27684504516422c37ccadcca98c))
* **core:** implement image source loaders ([3a7f536](https://github.com/AnimaApp/scooby/commit/3a7f536e6e4a0c5e62c0f8ffd08172b9d5d0cacb))
* **core:** implement new screenshot logic ([#59](https://github.com/AnimaApp/scooby/issues/59)) ([562c3ed](https://github.com/AnimaApp/scooby/commit/562c3ed14f954811489dd2ea531c0dead3f487d0))
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
* increase screenshot logging to debug hard-to-reproduce problem in production ([#65](https://github.com/AnimaApp/scooby/issues/65)) ([51ff03e](https://github.com/AnimaApp/scooby/commit/51ff03e6912a4d3b87461e03d953b8f4451961bc))
* introduce code-based reports ([#32](https://github.com/AnimaApp/scooby/issues/32)) ([0a2c805](https://github.com/AnimaApp/scooby/commit/0a2c805bcbfe8cdd8b65b0bd553fcb290142a607))
* progress in the API implementation ([5a10963](https://github.com/AnimaApp/scooby/commit/5a109635ed23731f3de680687afda687757b74b2))
* refactor loaders to handle recursive directories and explicit file type ([#44](https://github.com/AnimaApp/scooby/issues/44)) ([cbd29a6](https://github.com/AnimaApp/scooby/commit/cbd29a6b43d22a0bd97d9872b08a4a7a0cac8f5f))
* try adding mitigation for goto hang ([#67](https://github.com/AnimaApp/scooby/issues/67)) ([3958a81](https://github.com/AnimaApp/scooby/commit/3958a811ec5e979838ad0c7db8badaea7a8f2aec))





# 1.23.0 (2023-03-28)


### Bug Fixes

* add automatic retries for html screenshots ([#33](https://github.com/AnimaApp/scooby/issues/33)) and improve error reporting ([#35](https://github.com/AnimaApp/scooby/issues/35)) ([2eed87d](https://github.com/AnimaApp/scooby/commit/2eed87d5d1a1b68e212d27de4aa40b36a51ae440))
* build all CI command ([47af62a](https://github.com/AnimaApp/scooby/commit/47af62a01303fa01c96cad910a89f09adb5a688f))
* **core:** fix regression reference backtracking not considering base commit ([#83](https://github.com/AnimaApp/scooby/issues/83)) ([521e383](https://github.com/AnimaApp/scooby/commit/521e383f98ae24b81da60dafc17d5a9b16922697))
* **core:** increase code diff buffer ([#80](https://github.com/AnimaApp/scooby/issues/80)) ([797886b](https://github.com/AnimaApp/scooby/commit/797886bb1c24c5891e3c3550330e587d351dafb0))
* main branch reviews leaking ([#42](https://github.com/AnimaApp/scooby/issues/42)) ([b7de30d](https://github.com/AnimaApp/scooby/commit/b7de30dd05b92490c9758fd33570a09801246a27))
* make flexible matching case insensitive ([#88](https://github.com/AnimaApp/scooby/issues/88)) ([2920799](https://github.com/AnimaApp/scooby/commit/2920799000f3b289de36b46fa1e73c6e0dc9c3ba))
* rename types to shared ([670d036](https://github.com/AnimaApp/scooby/commit/670d0362f871cfca46e636561ef2b637d0327ba0))
* screenshot timeout ([#55](https://github.com/AnimaApp/scooby/issues/55)) ([19190d5](https://github.com/AnimaApp/scooby/commit/19190d5d4f173a3b5e644470b14e536f9098c848))


### Features

* add approval UI ([#24](https://github.com/AnimaApp/scooby/issues/24)) ([a30b8f8](https://github.com/AnimaApp/scooby/commit/a30b8f830720d5e58859cef9db4a20c71dc68441))
* add approvals ([#20](https://github.com/AnimaApp/scooby/issues/20)) ([3b0f4ad](https://github.com/AnimaApp/scooby/commit/3b0f4adcf65819707a2d913a95583f9c91a5bc13))
* add core and types modules ([6c6581e](https://github.com/AnimaApp/scooby/commit/6c6581ef4e464d10405e4942dae059ec43b836a7))
* Add dataset type option ([#94](https://github.com/AnimaApp/scooby/issues/94)) ([50f125c](https://github.com/AnimaApp/scooby/commit/50f125c928987cff0896063ba67e7717ed4064ad))
* add fidelity-regression report ([#76](https://github.com/AnimaApp/scooby/issues/76)) ([97ff50b](https://github.com/AnimaApp/scooby/commit/97ff50b52ec9fea5e749e1bdb09778d5c1844620))
* add forked git resolution module ([8031a4a](https://github.com/AnimaApp/scooby/commit/8031a4a2bc421cba4976ebd4e0147884758eefb7))
* add logic to upload regression report to S3 ([9a3f6fe](https://github.com/AnimaApp/scooby/commit/9a3f6fe1e6f9f42e5156ffc7ce6bd03fa3faf9be))
* add Scooby CI tests ([#6](https://github.com/AnimaApp/scooby/issues/6)) ([28a916f](https://github.com/AnimaApp/scooby/commit/28a916f4155b03fee0704b1c53cca03b8502af78))
* add Scooby deploy to GH pages ([#5](https://github.com/AnimaApp/scooby/issues/5)) ([8a94f4c](https://github.com/AnimaApp/scooby/commit/8a94f4cc039647c6207d8419a11b8dc0029b15e8))
* add steps to publish packages ([#13](https://github.com/AnimaApp/scooby/issues/13)) ([eac5e33](https://github.com/AnimaApp/scooby/commit/eac5e33b2eb2ab0974466895ae40bd5ea2e985d8))
* add support for different file types ([#63](https://github.com/AnimaApp/scooby/issues/63)) ([e642bb0](https://github.com/AnimaApp/scooby/commit/e642bb0fa6f3c5da9d0f7f6bd696869029b766a7))
* add support for metadata fields ([#53](https://github.com/AnimaApp/scooby/issues/53)) ([243ab27](https://github.com/AnimaApp/scooby/commit/243ab2773dee551f0c82ed195bc38a33f2a0607f))
* add support for multiple file types ([#92](https://github.com/AnimaApp/scooby/issues/92)) ([ecdb799](https://github.com/AnimaApp/scooby/commit/ecdb799e53826295ae9637386f0117884bca48b6))
* add support for ZIP archives ([#72](https://github.com/AnimaApp/scooby/issues/72)) ([dc18721](https://github.com/AnimaApp/scooby/commit/dc18721957fecd7b1feb803940506ec758351bfa))
* add threshold to fidelity test ([#36](https://github.com/AnimaApp/scooby/issues/36)) ([d48c9b8](https://github.com/AnimaApp/scooby/commit/d48c9b8ec5530a5125a80869dae4a77df45d3840))
* **core:** add flexible matching strategy ([#84](https://github.com/AnimaApp/scooby/issues/84)) ([943679b](https://github.com/AnimaApp/scooby/commit/943679ba891ac371fdd47f44de4bc7ff3bdb7085))
* **core:** add image diffing algorithms ([73a16e0](https://github.com/AnimaApp/scooby/commit/73a16e07defd2c5868aa5df9ba078b200a5b5fc4))
* **core:** add new loader mode for nested structure with multiple files ([#16](https://github.com/AnimaApp/scooby/issues/16)) ([4b36553](https://github.com/AnimaApp/scooby/commit/4b365538d61fc27684504516422c37ccadcca98c))
* **core:** implement image source loaders ([3a7f536](https://github.com/AnimaApp/scooby/commit/3a7f536e6e4a0c5e62c0f8ffd08172b9d5d0cacb))
* **core:** implement new screenshot logic ([#59](https://github.com/AnimaApp/scooby/issues/59)) ([562c3ed](https://github.com/AnimaApp/scooby/commit/562c3ed14f954811489dd2ea531c0dead3f487d0))
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
* increase screenshot logging to debug hard-to-reproduce problem in production ([#65](https://github.com/AnimaApp/scooby/issues/65)) ([51ff03e](https://github.com/AnimaApp/scooby/commit/51ff03e6912a4d3b87461e03d953b8f4451961bc))
* introduce code-based reports ([#32](https://github.com/AnimaApp/scooby/issues/32)) ([0a2c805](https://github.com/AnimaApp/scooby/commit/0a2c805bcbfe8cdd8b65b0bd553fcb290142a607))
* progress in the API implementation ([5a10963](https://github.com/AnimaApp/scooby/commit/5a109635ed23731f3de680687afda687757b74b2))
* refactor loaders to handle recursive directories and explicit file type ([#44](https://github.com/AnimaApp/scooby/issues/44)) ([cbd29a6](https://github.com/AnimaApp/scooby/commit/cbd29a6b43d22a0bd97d9872b08a4a7a0cac8f5f))
* try adding mitigation for goto hang ([#67](https://github.com/AnimaApp/scooby/issues/67)) ([3958a81](https://github.com/AnimaApp/scooby/commit/3958a811ec5e979838ad0c7db8badaea7a8f2aec))





# 1.22.0 (2023-03-28)


### Bug Fixes

* add automatic retries for html screenshots ([#33](https://github.com/AnimaApp/scooby/issues/33)) and improve error reporting ([#35](https://github.com/AnimaApp/scooby/issues/35)) ([2eed87d](https://github.com/AnimaApp/scooby/commit/2eed87d5d1a1b68e212d27de4aa40b36a51ae440))
* build all CI command ([47af62a](https://github.com/AnimaApp/scooby/commit/47af62a01303fa01c96cad910a89f09adb5a688f))
* **core:** fix regression reference backtracking not considering base commit ([#83](https://github.com/AnimaApp/scooby/issues/83)) ([521e383](https://github.com/AnimaApp/scooby/commit/521e383f98ae24b81da60dafc17d5a9b16922697))
* **core:** increase code diff buffer ([#80](https://github.com/AnimaApp/scooby/issues/80)) ([797886b](https://github.com/AnimaApp/scooby/commit/797886bb1c24c5891e3c3550330e587d351dafb0))
* main branch reviews leaking ([#42](https://github.com/AnimaApp/scooby/issues/42)) ([b7de30d](https://github.com/AnimaApp/scooby/commit/b7de30dd05b92490c9758fd33570a09801246a27))
* make flexible matching case insensitive ([#88](https://github.com/AnimaApp/scooby/issues/88)) ([2920799](https://github.com/AnimaApp/scooby/commit/2920799000f3b289de36b46fa1e73c6e0dc9c3ba))
* rename types to shared ([670d036](https://github.com/AnimaApp/scooby/commit/670d0362f871cfca46e636561ef2b637d0327ba0))
* screenshot timeout ([#55](https://github.com/AnimaApp/scooby/issues/55)) ([19190d5](https://github.com/AnimaApp/scooby/commit/19190d5d4f173a3b5e644470b14e536f9098c848))


### Features

* add approval UI ([#24](https://github.com/AnimaApp/scooby/issues/24)) ([a30b8f8](https://github.com/AnimaApp/scooby/commit/a30b8f830720d5e58859cef9db4a20c71dc68441))
* add approvals ([#20](https://github.com/AnimaApp/scooby/issues/20)) ([3b0f4ad](https://github.com/AnimaApp/scooby/commit/3b0f4adcf65819707a2d913a95583f9c91a5bc13))
* add core and types modules ([6c6581e](https://github.com/AnimaApp/scooby/commit/6c6581ef4e464d10405e4942dae059ec43b836a7))
* Add dataset type option ([#94](https://github.com/AnimaApp/scooby/issues/94)) ([50f125c](https://github.com/AnimaApp/scooby/commit/50f125c928987cff0896063ba67e7717ed4064ad))
* add fidelity-regression report ([#76](https://github.com/AnimaApp/scooby/issues/76)) ([97ff50b](https://github.com/AnimaApp/scooby/commit/97ff50b52ec9fea5e749e1bdb09778d5c1844620))
* add forked git resolution module ([8031a4a](https://github.com/AnimaApp/scooby/commit/8031a4a2bc421cba4976ebd4e0147884758eefb7))
* add logic to upload regression report to S3 ([9a3f6fe](https://github.com/AnimaApp/scooby/commit/9a3f6fe1e6f9f42e5156ffc7ce6bd03fa3faf9be))
* add Scooby CI tests ([#6](https://github.com/AnimaApp/scooby/issues/6)) ([28a916f](https://github.com/AnimaApp/scooby/commit/28a916f4155b03fee0704b1c53cca03b8502af78))
* add Scooby deploy to GH pages ([#5](https://github.com/AnimaApp/scooby/issues/5)) ([8a94f4c](https://github.com/AnimaApp/scooby/commit/8a94f4cc039647c6207d8419a11b8dc0029b15e8))
* add steps to publish packages ([#13](https://github.com/AnimaApp/scooby/issues/13)) ([eac5e33](https://github.com/AnimaApp/scooby/commit/eac5e33b2eb2ab0974466895ae40bd5ea2e985d8))
* add support for different file types ([#63](https://github.com/AnimaApp/scooby/issues/63)) ([e642bb0](https://github.com/AnimaApp/scooby/commit/e642bb0fa6f3c5da9d0f7f6bd696869029b766a7))
* add support for metadata fields ([#53](https://github.com/AnimaApp/scooby/issues/53)) ([243ab27](https://github.com/AnimaApp/scooby/commit/243ab2773dee551f0c82ed195bc38a33f2a0607f))
* add support for multiple file types ([#92](https://github.com/AnimaApp/scooby/issues/92)) ([ecdb799](https://github.com/AnimaApp/scooby/commit/ecdb799e53826295ae9637386f0117884bca48b6))
* add support for ZIP archives ([#72](https://github.com/AnimaApp/scooby/issues/72)) ([dc18721](https://github.com/AnimaApp/scooby/commit/dc18721957fecd7b1feb803940506ec758351bfa))
* add threshold to fidelity test ([#36](https://github.com/AnimaApp/scooby/issues/36)) ([d48c9b8](https://github.com/AnimaApp/scooby/commit/d48c9b8ec5530a5125a80869dae4a77df45d3840))
* **core:** add flexible matching strategy ([#84](https://github.com/AnimaApp/scooby/issues/84)) ([943679b](https://github.com/AnimaApp/scooby/commit/943679ba891ac371fdd47f44de4bc7ff3bdb7085))
* **core:** add image diffing algorithms ([73a16e0](https://github.com/AnimaApp/scooby/commit/73a16e07defd2c5868aa5df9ba078b200a5b5fc4))
* **core:** add new loader mode for nested structure with multiple files ([#16](https://github.com/AnimaApp/scooby/issues/16)) ([4b36553](https://github.com/AnimaApp/scooby/commit/4b365538d61fc27684504516422c37ccadcca98c))
* **core:** implement image source loaders ([3a7f536](https://github.com/AnimaApp/scooby/commit/3a7f536e6e4a0c5e62c0f8ffd08172b9d5d0cacb))
* **core:** implement new screenshot logic ([#59](https://github.com/AnimaApp/scooby/issues/59)) ([562c3ed](https://github.com/AnimaApp/scooby/commit/562c3ed14f954811489dd2ea531c0dead3f487d0))
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
* increase screenshot logging to debug hard-to-reproduce problem in production ([#65](https://github.com/AnimaApp/scooby/issues/65)) ([51ff03e](https://github.com/AnimaApp/scooby/commit/51ff03e6912a4d3b87461e03d953b8f4451961bc))
* introduce code-based reports ([#32](https://github.com/AnimaApp/scooby/issues/32)) ([0a2c805](https://github.com/AnimaApp/scooby/commit/0a2c805bcbfe8cdd8b65b0bd553fcb290142a607))
* progress in the API implementation ([5a10963](https://github.com/AnimaApp/scooby/commit/5a109635ed23731f3de680687afda687757b74b2))
* refactor loaders to handle recursive directories and explicit file type ([#44](https://github.com/AnimaApp/scooby/issues/44)) ([cbd29a6](https://github.com/AnimaApp/scooby/commit/cbd29a6b43d22a0bd97d9872b08a4a7a0cac8f5f))
* try adding mitigation for goto hang ([#67](https://github.com/AnimaApp/scooby/issues/67)) ([3958a81](https://github.com/AnimaApp/scooby/commit/3958a811ec5e979838ad0c7db8badaea7a8f2aec))





# 1.21.0 (2023-01-16)


### Bug Fixes

* add automatic retries for html screenshots ([#33](https://github.com/AnimaApp/scooby/issues/33)) and improve error reporting ([#35](https://github.com/AnimaApp/scooby/issues/35)) ([2eed87d](https://github.com/AnimaApp/scooby/commit/2eed87d5d1a1b68e212d27de4aa40b36a51ae440))
* build all CI command ([47af62a](https://github.com/AnimaApp/scooby/commit/47af62a01303fa01c96cad910a89f09adb5a688f))
* **core:** fix regression reference backtracking not considering base commit ([#83](https://github.com/AnimaApp/scooby/issues/83)) ([521e383](https://github.com/AnimaApp/scooby/commit/521e383f98ae24b81da60dafc17d5a9b16922697))
* **core:** increase code diff buffer ([#80](https://github.com/AnimaApp/scooby/issues/80)) ([797886b](https://github.com/AnimaApp/scooby/commit/797886bb1c24c5891e3c3550330e587d351dafb0))
* main branch reviews leaking ([#42](https://github.com/AnimaApp/scooby/issues/42)) ([b7de30d](https://github.com/AnimaApp/scooby/commit/b7de30dd05b92490c9758fd33570a09801246a27))
* make flexible matching case insensitive ([#88](https://github.com/AnimaApp/scooby/issues/88)) ([2920799](https://github.com/AnimaApp/scooby/commit/2920799000f3b289de36b46fa1e73c6e0dc9c3ba))
* rename types to shared ([670d036](https://github.com/AnimaApp/scooby/commit/670d0362f871cfca46e636561ef2b637d0327ba0))
* screenshot timeout ([#55](https://github.com/AnimaApp/scooby/issues/55)) ([19190d5](https://github.com/AnimaApp/scooby/commit/19190d5d4f173a3b5e644470b14e536f9098c848))


### Features

* add approval UI ([#24](https://github.com/AnimaApp/scooby/issues/24)) ([a30b8f8](https://github.com/AnimaApp/scooby/commit/a30b8f830720d5e58859cef9db4a20c71dc68441))
* add approvals ([#20](https://github.com/AnimaApp/scooby/issues/20)) ([3b0f4ad](https://github.com/AnimaApp/scooby/commit/3b0f4adcf65819707a2d913a95583f9c91a5bc13))
* add core and types modules ([6c6581e](https://github.com/AnimaApp/scooby/commit/6c6581ef4e464d10405e4942dae059ec43b836a7))
* Add dataset type option ([#94](https://github.com/AnimaApp/scooby/issues/94)) ([50f125c](https://github.com/AnimaApp/scooby/commit/50f125c928987cff0896063ba67e7717ed4064ad))
* add fidelity-regression report ([#76](https://github.com/AnimaApp/scooby/issues/76)) ([97ff50b](https://github.com/AnimaApp/scooby/commit/97ff50b52ec9fea5e749e1bdb09778d5c1844620))
* add forked git resolution module ([8031a4a](https://github.com/AnimaApp/scooby/commit/8031a4a2bc421cba4976ebd4e0147884758eefb7))
* add logic to upload regression report to S3 ([9a3f6fe](https://github.com/AnimaApp/scooby/commit/9a3f6fe1e6f9f42e5156ffc7ce6bd03fa3faf9be))
* add Scooby CI tests ([#6](https://github.com/AnimaApp/scooby/issues/6)) ([28a916f](https://github.com/AnimaApp/scooby/commit/28a916f4155b03fee0704b1c53cca03b8502af78))
* add Scooby deploy to GH pages ([#5](https://github.com/AnimaApp/scooby/issues/5)) ([8a94f4c](https://github.com/AnimaApp/scooby/commit/8a94f4cc039647c6207d8419a11b8dc0029b15e8))
* add steps to publish packages ([#13](https://github.com/AnimaApp/scooby/issues/13)) ([eac5e33](https://github.com/AnimaApp/scooby/commit/eac5e33b2eb2ab0974466895ae40bd5ea2e985d8))
* add support for different file types ([#63](https://github.com/AnimaApp/scooby/issues/63)) ([e642bb0](https://github.com/AnimaApp/scooby/commit/e642bb0fa6f3c5da9d0f7f6bd696869029b766a7))
* add support for metadata fields ([#53](https://github.com/AnimaApp/scooby/issues/53)) ([243ab27](https://github.com/AnimaApp/scooby/commit/243ab2773dee551f0c82ed195bc38a33f2a0607f))
* add support for multiple file types ([#92](https://github.com/AnimaApp/scooby/issues/92)) ([ecdb799](https://github.com/AnimaApp/scooby/commit/ecdb799e53826295ae9637386f0117884bca48b6))
* add support for ZIP archives ([#72](https://github.com/AnimaApp/scooby/issues/72)) ([dc18721](https://github.com/AnimaApp/scooby/commit/dc18721957fecd7b1feb803940506ec758351bfa))
* add threshold to fidelity test ([#36](https://github.com/AnimaApp/scooby/issues/36)) ([d48c9b8](https://github.com/AnimaApp/scooby/commit/d48c9b8ec5530a5125a80869dae4a77df45d3840))
* **core:** add flexible matching strategy ([#84](https://github.com/AnimaApp/scooby/issues/84)) ([943679b](https://github.com/AnimaApp/scooby/commit/943679ba891ac371fdd47f44de4bc7ff3bdb7085))
* **core:** add image diffing algorithms ([73a16e0](https://github.com/AnimaApp/scooby/commit/73a16e07defd2c5868aa5df9ba078b200a5b5fc4))
* **core:** add new loader mode for nested structure with multiple files ([#16](https://github.com/AnimaApp/scooby/issues/16)) ([4b36553](https://github.com/AnimaApp/scooby/commit/4b365538d61fc27684504516422c37ccadcca98c))
* **core:** implement image source loaders ([3a7f536](https://github.com/AnimaApp/scooby/commit/3a7f536e6e4a0c5e62c0f8ffd08172b9d5d0cacb))
* **core:** implement new screenshot logic ([#59](https://github.com/AnimaApp/scooby/issues/59)) ([562c3ed](https://github.com/AnimaApp/scooby/commit/562c3ed14f954811489dd2ea531c0dead3f487d0))
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
* increase screenshot logging to debug hard-to-reproduce problem in production ([#65](https://github.com/AnimaApp/scooby/issues/65)) ([51ff03e](https://github.com/AnimaApp/scooby/commit/51ff03e6912a4d3b87461e03d953b8f4451961bc))
* introduce code-based reports ([#32](https://github.com/AnimaApp/scooby/issues/32)) ([0a2c805](https://github.com/AnimaApp/scooby/commit/0a2c805bcbfe8cdd8b65b0bd553fcb290142a607))
* progress in the API implementation ([5a10963](https://github.com/AnimaApp/scooby/commit/5a109635ed23731f3de680687afda687757b74b2))
* refactor loaders to handle recursive directories and explicit file type ([#44](https://github.com/AnimaApp/scooby/issues/44)) ([cbd29a6](https://github.com/AnimaApp/scooby/commit/cbd29a6b43d22a0bd97d9872b08a4a7a0cac8f5f))
* try adding mitigation for goto hang ([#67](https://github.com/AnimaApp/scooby/issues/67)) ([3958a81](https://github.com/AnimaApp/scooby/commit/3958a811ec5e979838ad0c7db8badaea7a8f2aec))





# 1.20.0 (2022-12-21)


### Bug Fixes

* add automatic retries for html screenshots ([#33](https://github.com/AnimaApp/scooby/issues/33)) and improve error reporting ([#35](https://github.com/AnimaApp/scooby/issues/35)) ([2eed87d](https://github.com/AnimaApp/scooby/commit/2eed87d5d1a1b68e212d27de4aa40b36a51ae440))
* build all CI command ([47af62a](https://github.com/AnimaApp/scooby/commit/47af62a01303fa01c96cad910a89f09adb5a688f))
* **core:** fix regression reference backtracking not considering base commit ([#83](https://github.com/AnimaApp/scooby/issues/83)) ([521e383](https://github.com/AnimaApp/scooby/commit/521e383f98ae24b81da60dafc17d5a9b16922697))
* **core:** increase code diff buffer ([#80](https://github.com/AnimaApp/scooby/issues/80)) ([797886b](https://github.com/AnimaApp/scooby/commit/797886bb1c24c5891e3c3550330e587d351dafb0))
* main branch reviews leaking ([#42](https://github.com/AnimaApp/scooby/issues/42)) ([b7de30d](https://github.com/AnimaApp/scooby/commit/b7de30dd05b92490c9758fd33570a09801246a27))
* make flexible matching case insensitive ([#88](https://github.com/AnimaApp/scooby/issues/88)) ([2920799](https://github.com/AnimaApp/scooby/commit/2920799000f3b289de36b46fa1e73c6e0dc9c3ba))
* rename types to shared ([670d036](https://github.com/AnimaApp/scooby/commit/670d0362f871cfca46e636561ef2b637d0327ba0))
* screenshot timeout ([#55](https://github.com/AnimaApp/scooby/issues/55)) ([19190d5](https://github.com/AnimaApp/scooby/commit/19190d5d4f173a3b5e644470b14e536f9098c848))


### Features

* add approval UI ([#24](https://github.com/AnimaApp/scooby/issues/24)) ([a30b8f8](https://github.com/AnimaApp/scooby/commit/a30b8f830720d5e58859cef9db4a20c71dc68441))
* add approvals ([#20](https://github.com/AnimaApp/scooby/issues/20)) ([3b0f4ad](https://github.com/AnimaApp/scooby/commit/3b0f4adcf65819707a2d913a95583f9c91a5bc13))
* add core and types modules ([6c6581e](https://github.com/AnimaApp/scooby/commit/6c6581ef4e464d10405e4942dae059ec43b836a7))
* add fidelity-regression report ([#76](https://github.com/AnimaApp/scooby/issues/76)) ([97ff50b](https://github.com/AnimaApp/scooby/commit/97ff50b52ec9fea5e749e1bdb09778d5c1844620))
* add forked git resolution module ([8031a4a](https://github.com/AnimaApp/scooby/commit/8031a4a2bc421cba4976ebd4e0147884758eefb7))
* add logic to upload regression report to S3 ([9a3f6fe](https://github.com/AnimaApp/scooby/commit/9a3f6fe1e6f9f42e5156ffc7ce6bd03fa3faf9be))
* add Scooby CI tests ([#6](https://github.com/AnimaApp/scooby/issues/6)) ([28a916f](https://github.com/AnimaApp/scooby/commit/28a916f4155b03fee0704b1c53cca03b8502af78))
* add Scooby deploy to GH pages ([#5](https://github.com/AnimaApp/scooby/issues/5)) ([8a94f4c](https://github.com/AnimaApp/scooby/commit/8a94f4cc039647c6207d8419a11b8dc0029b15e8))
* add steps to publish packages ([#13](https://github.com/AnimaApp/scooby/issues/13)) ([eac5e33](https://github.com/AnimaApp/scooby/commit/eac5e33b2eb2ab0974466895ae40bd5ea2e985d8))
* add support for different file types ([#63](https://github.com/AnimaApp/scooby/issues/63)) ([e642bb0](https://github.com/AnimaApp/scooby/commit/e642bb0fa6f3c5da9d0f7f6bd696869029b766a7))
* add support for metadata fields ([#53](https://github.com/AnimaApp/scooby/issues/53)) ([243ab27](https://github.com/AnimaApp/scooby/commit/243ab2773dee551f0c82ed195bc38a33f2a0607f))
* add support for multiple file types ([#92](https://github.com/AnimaApp/scooby/issues/92)) ([ecdb799](https://github.com/AnimaApp/scooby/commit/ecdb799e53826295ae9637386f0117884bca48b6))
* add support for ZIP archives ([#72](https://github.com/AnimaApp/scooby/issues/72)) ([dc18721](https://github.com/AnimaApp/scooby/commit/dc18721957fecd7b1feb803940506ec758351bfa))
* add threshold to fidelity test ([#36](https://github.com/AnimaApp/scooby/issues/36)) ([d48c9b8](https://github.com/AnimaApp/scooby/commit/d48c9b8ec5530a5125a80869dae4a77df45d3840))
* **core:** add flexible matching strategy ([#84](https://github.com/AnimaApp/scooby/issues/84)) ([943679b](https://github.com/AnimaApp/scooby/commit/943679ba891ac371fdd47f44de4bc7ff3bdb7085))
* **core:** add image diffing algorithms ([73a16e0](https://github.com/AnimaApp/scooby/commit/73a16e07defd2c5868aa5df9ba078b200a5b5fc4))
* **core:** add new loader mode for nested structure with multiple files ([#16](https://github.com/AnimaApp/scooby/issues/16)) ([4b36553](https://github.com/AnimaApp/scooby/commit/4b365538d61fc27684504516422c37ccadcca98c))
* **core:** implement image source loaders ([3a7f536](https://github.com/AnimaApp/scooby/commit/3a7f536e6e4a0c5e62c0f8ffd08172b9d5d0cacb))
* **core:** implement new screenshot logic ([#59](https://github.com/AnimaApp/scooby/issues/59)) ([562c3ed](https://github.com/AnimaApp/scooby/commit/562c3ed14f954811489dd2ea531c0dead3f487d0))
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
* increase screenshot logging to debug hard-to-reproduce problem in production ([#65](https://github.com/AnimaApp/scooby/issues/65)) ([51ff03e](https://github.com/AnimaApp/scooby/commit/51ff03e6912a4d3b87461e03d953b8f4451961bc))
* introduce code-based reports ([#32](https://github.com/AnimaApp/scooby/issues/32)) ([0a2c805](https://github.com/AnimaApp/scooby/commit/0a2c805bcbfe8cdd8b65b0bd553fcb290142a607))
* progress in the API implementation ([5a10963](https://github.com/AnimaApp/scooby/commit/5a109635ed23731f3de680687afda687757b74b2))
* refactor loaders to handle recursive directories and explicit file type ([#44](https://github.com/AnimaApp/scooby/issues/44)) ([cbd29a6](https://github.com/AnimaApp/scooby/commit/cbd29a6b43d22a0bd97d9872b08a4a7a0cac8f5f))
* try adding mitigation for goto hang ([#67](https://github.com/AnimaApp/scooby/issues/67)) ([3958a81](https://github.com/AnimaApp/scooby/commit/3958a811ec5e979838ad0c7db8badaea7a8f2aec))





# 1.19.0 (2022-11-25)


### Bug Fixes

* add automatic retries for html screenshots ([#33](https://github.com/AnimaApp/scooby/issues/33)) and improve error reporting ([#35](https://github.com/AnimaApp/scooby/issues/35)) ([2eed87d](https://github.com/AnimaApp/scooby/commit/2eed87d5d1a1b68e212d27de4aa40b36a51ae440))
* build all CI command ([47af62a](https://github.com/AnimaApp/scooby/commit/47af62a01303fa01c96cad910a89f09adb5a688f))
* **core:** fix regression reference backtracking not considering base commit ([#83](https://github.com/AnimaApp/scooby/issues/83)) ([521e383](https://github.com/AnimaApp/scooby/commit/521e383f98ae24b81da60dafc17d5a9b16922697))
* **core:** increase code diff buffer ([#80](https://github.com/AnimaApp/scooby/issues/80)) ([797886b](https://github.com/AnimaApp/scooby/commit/797886bb1c24c5891e3c3550330e587d351dafb0))
* main branch reviews leaking ([#42](https://github.com/AnimaApp/scooby/issues/42)) ([b7de30d](https://github.com/AnimaApp/scooby/commit/b7de30dd05b92490c9758fd33570a09801246a27))
* make flexible matching case insensitive ([#88](https://github.com/AnimaApp/scooby/issues/88)) ([2920799](https://github.com/AnimaApp/scooby/commit/2920799000f3b289de36b46fa1e73c6e0dc9c3ba))
* rename types to shared ([670d036](https://github.com/AnimaApp/scooby/commit/670d0362f871cfca46e636561ef2b637d0327ba0))
* screenshot timeout ([#55](https://github.com/AnimaApp/scooby/issues/55)) ([19190d5](https://github.com/AnimaApp/scooby/commit/19190d5d4f173a3b5e644470b14e536f9098c848))


### Features

* add approval UI ([#24](https://github.com/AnimaApp/scooby/issues/24)) ([a30b8f8](https://github.com/AnimaApp/scooby/commit/a30b8f830720d5e58859cef9db4a20c71dc68441))
* add approvals ([#20](https://github.com/AnimaApp/scooby/issues/20)) ([3b0f4ad](https://github.com/AnimaApp/scooby/commit/3b0f4adcf65819707a2d913a95583f9c91a5bc13))
* add core and types modules ([6c6581e](https://github.com/AnimaApp/scooby/commit/6c6581ef4e464d10405e4942dae059ec43b836a7))
* add fidelity-regression report ([#76](https://github.com/AnimaApp/scooby/issues/76)) ([97ff50b](https://github.com/AnimaApp/scooby/commit/97ff50b52ec9fea5e749e1bdb09778d5c1844620))
* add forked git resolution module ([8031a4a](https://github.com/AnimaApp/scooby/commit/8031a4a2bc421cba4976ebd4e0147884758eefb7))
* add logic to upload regression report to S3 ([9a3f6fe](https://github.com/AnimaApp/scooby/commit/9a3f6fe1e6f9f42e5156ffc7ce6bd03fa3faf9be))
* add Scooby CI tests ([#6](https://github.com/AnimaApp/scooby/issues/6)) ([28a916f](https://github.com/AnimaApp/scooby/commit/28a916f4155b03fee0704b1c53cca03b8502af78))
* add Scooby deploy to GH pages ([#5](https://github.com/AnimaApp/scooby/issues/5)) ([8a94f4c](https://github.com/AnimaApp/scooby/commit/8a94f4cc039647c6207d8419a11b8dc0029b15e8))
* add steps to publish packages ([#13](https://github.com/AnimaApp/scooby/issues/13)) ([eac5e33](https://github.com/AnimaApp/scooby/commit/eac5e33b2eb2ab0974466895ae40bd5ea2e985d8))
* add support for different file types ([#63](https://github.com/AnimaApp/scooby/issues/63)) ([e642bb0](https://github.com/AnimaApp/scooby/commit/e642bb0fa6f3c5da9d0f7f6bd696869029b766a7))
* add support for metadata fields ([#53](https://github.com/AnimaApp/scooby/issues/53)) ([243ab27](https://github.com/AnimaApp/scooby/commit/243ab2773dee551f0c82ed195bc38a33f2a0607f))
* add support for ZIP archives ([#72](https://github.com/AnimaApp/scooby/issues/72)) ([dc18721](https://github.com/AnimaApp/scooby/commit/dc18721957fecd7b1feb803940506ec758351bfa))
* add threshold to fidelity test ([#36](https://github.com/AnimaApp/scooby/issues/36)) ([d48c9b8](https://github.com/AnimaApp/scooby/commit/d48c9b8ec5530a5125a80869dae4a77df45d3840))
* **core:** add flexible matching strategy ([#84](https://github.com/AnimaApp/scooby/issues/84)) ([943679b](https://github.com/AnimaApp/scooby/commit/943679ba891ac371fdd47f44de4bc7ff3bdb7085))
* **core:** add image diffing algorithms ([73a16e0](https://github.com/AnimaApp/scooby/commit/73a16e07defd2c5868aa5df9ba078b200a5b5fc4))
* **core:** add new loader mode for nested structure with multiple files ([#16](https://github.com/AnimaApp/scooby/issues/16)) ([4b36553](https://github.com/AnimaApp/scooby/commit/4b365538d61fc27684504516422c37ccadcca98c))
* **core:** implement image source loaders ([3a7f536](https://github.com/AnimaApp/scooby/commit/3a7f536e6e4a0c5e62c0f8ffd08172b9d5d0cacb))
* **core:** implement new screenshot logic ([#59](https://github.com/AnimaApp/scooby/issues/59)) ([562c3ed](https://github.com/AnimaApp/scooby/commit/562c3ed14f954811489dd2ea531c0dead3f487d0))
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
* increase screenshot logging to debug hard-to-reproduce problem in production ([#65](https://github.com/AnimaApp/scooby/issues/65)) ([51ff03e](https://github.com/AnimaApp/scooby/commit/51ff03e6912a4d3b87461e03d953b8f4451961bc))
* introduce code-based reports ([#32](https://github.com/AnimaApp/scooby/issues/32)) ([0a2c805](https://github.com/AnimaApp/scooby/commit/0a2c805bcbfe8cdd8b65b0bd553fcb290142a607))
* progress in the API implementation ([5a10963](https://github.com/AnimaApp/scooby/commit/5a109635ed23731f3de680687afda687757b74b2))
* refactor loaders to handle recursive directories and explicit file type ([#44](https://github.com/AnimaApp/scooby/issues/44)) ([cbd29a6](https://github.com/AnimaApp/scooby/commit/cbd29a6b43d22a0bd97d9872b08a4a7a0cac8f5f))
* try adding mitigation for goto hang ([#67](https://github.com/AnimaApp/scooby/issues/67)) ([3958a81](https://github.com/AnimaApp/scooby/commit/3958a811ec5e979838ad0c7db8badaea7a8f2aec))





# 1.18.0 (2022-11-25)


### Bug Fixes

* add automatic retries for html screenshots ([#33](https://github.com/AnimaApp/scooby/issues/33)) and improve error reporting ([#35](https://github.com/AnimaApp/scooby/issues/35)) ([2eed87d](https://github.com/AnimaApp/scooby/commit/2eed87d5d1a1b68e212d27de4aa40b36a51ae440))
* build all CI command ([47af62a](https://github.com/AnimaApp/scooby/commit/47af62a01303fa01c96cad910a89f09adb5a688f))
* **core:** fix regression reference backtracking not considering base commit ([#83](https://github.com/AnimaApp/scooby/issues/83)) ([521e383](https://github.com/AnimaApp/scooby/commit/521e383f98ae24b81da60dafc17d5a9b16922697))
* **core:** increase code diff buffer ([#80](https://github.com/AnimaApp/scooby/issues/80)) ([797886b](https://github.com/AnimaApp/scooby/commit/797886bb1c24c5891e3c3550330e587d351dafb0))
* main branch reviews leaking ([#42](https://github.com/AnimaApp/scooby/issues/42)) ([b7de30d](https://github.com/AnimaApp/scooby/commit/b7de30dd05b92490c9758fd33570a09801246a27))
* rename types to shared ([670d036](https://github.com/AnimaApp/scooby/commit/670d0362f871cfca46e636561ef2b637d0327ba0))
* screenshot timeout ([#55](https://github.com/AnimaApp/scooby/issues/55)) ([19190d5](https://github.com/AnimaApp/scooby/commit/19190d5d4f173a3b5e644470b14e536f9098c848))


### Features

* add approval UI ([#24](https://github.com/AnimaApp/scooby/issues/24)) ([a30b8f8](https://github.com/AnimaApp/scooby/commit/a30b8f830720d5e58859cef9db4a20c71dc68441))
* add approvals ([#20](https://github.com/AnimaApp/scooby/issues/20)) ([3b0f4ad](https://github.com/AnimaApp/scooby/commit/3b0f4adcf65819707a2d913a95583f9c91a5bc13))
* add core and types modules ([6c6581e](https://github.com/AnimaApp/scooby/commit/6c6581ef4e464d10405e4942dae059ec43b836a7))
* add fidelity-regression report ([#76](https://github.com/AnimaApp/scooby/issues/76)) ([97ff50b](https://github.com/AnimaApp/scooby/commit/97ff50b52ec9fea5e749e1bdb09778d5c1844620))
* add forked git resolution module ([8031a4a](https://github.com/AnimaApp/scooby/commit/8031a4a2bc421cba4976ebd4e0147884758eefb7))
* add logic to upload regression report to S3 ([9a3f6fe](https://github.com/AnimaApp/scooby/commit/9a3f6fe1e6f9f42e5156ffc7ce6bd03fa3faf9be))
* add Scooby CI tests ([#6](https://github.com/AnimaApp/scooby/issues/6)) ([28a916f](https://github.com/AnimaApp/scooby/commit/28a916f4155b03fee0704b1c53cca03b8502af78))
* add Scooby deploy to GH pages ([#5](https://github.com/AnimaApp/scooby/issues/5)) ([8a94f4c](https://github.com/AnimaApp/scooby/commit/8a94f4cc039647c6207d8419a11b8dc0029b15e8))
* add steps to publish packages ([#13](https://github.com/AnimaApp/scooby/issues/13)) ([eac5e33](https://github.com/AnimaApp/scooby/commit/eac5e33b2eb2ab0974466895ae40bd5ea2e985d8))
* add support for different file types ([#63](https://github.com/AnimaApp/scooby/issues/63)) ([e642bb0](https://github.com/AnimaApp/scooby/commit/e642bb0fa6f3c5da9d0f7f6bd696869029b766a7))
* add support for metadata fields ([#53](https://github.com/AnimaApp/scooby/issues/53)) ([243ab27](https://github.com/AnimaApp/scooby/commit/243ab2773dee551f0c82ed195bc38a33f2a0607f))
* add support for ZIP archives ([#72](https://github.com/AnimaApp/scooby/issues/72)) ([dc18721](https://github.com/AnimaApp/scooby/commit/dc18721957fecd7b1feb803940506ec758351bfa))
* add threshold to fidelity test ([#36](https://github.com/AnimaApp/scooby/issues/36)) ([d48c9b8](https://github.com/AnimaApp/scooby/commit/d48c9b8ec5530a5125a80869dae4a77df45d3840))
* **core:** add flexible matching strategy ([#84](https://github.com/AnimaApp/scooby/issues/84)) ([943679b](https://github.com/AnimaApp/scooby/commit/943679ba891ac371fdd47f44de4bc7ff3bdb7085))
* **core:** add image diffing algorithms ([73a16e0](https://github.com/AnimaApp/scooby/commit/73a16e07defd2c5868aa5df9ba078b200a5b5fc4))
* **core:** add new loader mode for nested structure with multiple files ([#16](https://github.com/AnimaApp/scooby/issues/16)) ([4b36553](https://github.com/AnimaApp/scooby/commit/4b365538d61fc27684504516422c37ccadcca98c))
* **core:** implement image source loaders ([3a7f536](https://github.com/AnimaApp/scooby/commit/3a7f536e6e4a0c5e62c0f8ffd08172b9d5d0cacb))
* **core:** implement new screenshot logic ([#59](https://github.com/AnimaApp/scooby/issues/59)) ([562c3ed](https://github.com/AnimaApp/scooby/commit/562c3ed14f954811489dd2ea531c0dead3f487d0))
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
* increase screenshot logging to debug hard-to-reproduce problem in production ([#65](https://github.com/AnimaApp/scooby/issues/65)) ([51ff03e](https://github.com/AnimaApp/scooby/commit/51ff03e6912a4d3b87461e03d953b8f4451961bc))
* introduce code-based reports ([#32](https://github.com/AnimaApp/scooby/issues/32)) ([0a2c805](https://github.com/AnimaApp/scooby/commit/0a2c805bcbfe8cdd8b65b0bd553fcb290142a607))
* progress in the API implementation ([5a10963](https://github.com/AnimaApp/scooby/commit/5a109635ed23731f3de680687afda687757b74b2))
* refactor loaders to handle recursive directories and explicit file type ([#44](https://github.com/AnimaApp/scooby/issues/44)) ([cbd29a6](https://github.com/AnimaApp/scooby/commit/cbd29a6b43d22a0bd97d9872b08a4a7a0cac8f5f))
* try adding mitigation for goto hang ([#67](https://github.com/AnimaApp/scooby/issues/67)) ([3958a81](https://github.com/AnimaApp/scooby/commit/3958a811ec5e979838ad0c7db8badaea7a8f2aec))





# 1.17.0 (2022-11-25)


### Bug Fixes

* add automatic retries for html screenshots ([#33](https://github.com/AnimaApp/scooby/issues/33)) and improve error reporting ([#35](https://github.com/AnimaApp/scooby/issues/35)) ([2eed87d](https://github.com/AnimaApp/scooby/commit/2eed87d5d1a1b68e212d27de4aa40b36a51ae440))
* build all CI command ([47af62a](https://github.com/AnimaApp/scooby/commit/47af62a01303fa01c96cad910a89f09adb5a688f))
* **core:** fix regression reference backtracking not considering base commit ([#83](https://github.com/AnimaApp/scooby/issues/83)) ([521e383](https://github.com/AnimaApp/scooby/commit/521e383f98ae24b81da60dafc17d5a9b16922697))
* **core:** increase code diff buffer ([#80](https://github.com/AnimaApp/scooby/issues/80)) ([797886b](https://github.com/AnimaApp/scooby/commit/797886bb1c24c5891e3c3550330e587d351dafb0))
* main branch reviews leaking ([#42](https://github.com/AnimaApp/scooby/issues/42)) ([b7de30d](https://github.com/AnimaApp/scooby/commit/b7de30dd05b92490c9758fd33570a09801246a27))
* rename types to shared ([670d036](https://github.com/AnimaApp/scooby/commit/670d0362f871cfca46e636561ef2b637d0327ba0))
* screenshot timeout ([#55](https://github.com/AnimaApp/scooby/issues/55)) ([19190d5](https://github.com/AnimaApp/scooby/commit/19190d5d4f173a3b5e644470b14e536f9098c848))


### Features

* add approval UI ([#24](https://github.com/AnimaApp/scooby/issues/24)) ([a30b8f8](https://github.com/AnimaApp/scooby/commit/a30b8f830720d5e58859cef9db4a20c71dc68441))
* add approvals ([#20](https://github.com/AnimaApp/scooby/issues/20)) ([3b0f4ad](https://github.com/AnimaApp/scooby/commit/3b0f4adcf65819707a2d913a95583f9c91a5bc13))
* add core and types modules ([6c6581e](https://github.com/AnimaApp/scooby/commit/6c6581ef4e464d10405e4942dae059ec43b836a7))
* add fidelity-regression report ([#76](https://github.com/AnimaApp/scooby/issues/76)) ([97ff50b](https://github.com/AnimaApp/scooby/commit/97ff50b52ec9fea5e749e1bdb09778d5c1844620))
* add forked git resolution module ([8031a4a](https://github.com/AnimaApp/scooby/commit/8031a4a2bc421cba4976ebd4e0147884758eefb7))
* add logic to upload regression report to S3 ([9a3f6fe](https://github.com/AnimaApp/scooby/commit/9a3f6fe1e6f9f42e5156ffc7ce6bd03fa3faf9be))
* add Scooby CI tests ([#6](https://github.com/AnimaApp/scooby/issues/6)) ([28a916f](https://github.com/AnimaApp/scooby/commit/28a916f4155b03fee0704b1c53cca03b8502af78))
* add Scooby deploy to GH pages ([#5](https://github.com/AnimaApp/scooby/issues/5)) ([8a94f4c](https://github.com/AnimaApp/scooby/commit/8a94f4cc039647c6207d8419a11b8dc0029b15e8))
* add steps to publish packages ([#13](https://github.com/AnimaApp/scooby/issues/13)) ([eac5e33](https://github.com/AnimaApp/scooby/commit/eac5e33b2eb2ab0974466895ae40bd5ea2e985d8))
* add support for different file types ([#63](https://github.com/AnimaApp/scooby/issues/63)) ([e642bb0](https://github.com/AnimaApp/scooby/commit/e642bb0fa6f3c5da9d0f7f6bd696869029b766a7))
* add support for metadata fields ([#53](https://github.com/AnimaApp/scooby/issues/53)) ([243ab27](https://github.com/AnimaApp/scooby/commit/243ab2773dee551f0c82ed195bc38a33f2a0607f))
* add support for ZIP archives ([#72](https://github.com/AnimaApp/scooby/issues/72)) ([dc18721](https://github.com/AnimaApp/scooby/commit/dc18721957fecd7b1feb803940506ec758351bfa))
* add threshold to fidelity test ([#36](https://github.com/AnimaApp/scooby/issues/36)) ([d48c9b8](https://github.com/AnimaApp/scooby/commit/d48c9b8ec5530a5125a80869dae4a77df45d3840))
* **core:** add image diffing algorithms ([73a16e0](https://github.com/AnimaApp/scooby/commit/73a16e07defd2c5868aa5df9ba078b200a5b5fc4))
* **core:** add new loader mode for nested structure with multiple files ([#16](https://github.com/AnimaApp/scooby/issues/16)) ([4b36553](https://github.com/AnimaApp/scooby/commit/4b365538d61fc27684504516422c37ccadcca98c))
* **core:** implement image source loaders ([3a7f536](https://github.com/AnimaApp/scooby/commit/3a7f536e6e4a0c5e62c0f8ffd08172b9d5d0cacb))
* **core:** implement new screenshot logic ([#59](https://github.com/AnimaApp/scooby/issues/59)) ([562c3ed](https://github.com/AnimaApp/scooby/commit/562c3ed14f954811489dd2ea531c0dead3f487d0))
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
* increase screenshot logging to debug hard-to-reproduce problem in production ([#65](https://github.com/AnimaApp/scooby/issues/65)) ([51ff03e](https://github.com/AnimaApp/scooby/commit/51ff03e6912a4d3b87461e03d953b8f4451961bc))
* introduce code-based reports ([#32](https://github.com/AnimaApp/scooby/issues/32)) ([0a2c805](https://github.com/AnimaApp/scooby/commit/0a2c805bcbfe8cdd8b65b0bd553fcb290142a607))
* progress in the API implementation ([5a10963](https://github.com/AnimaApp/scooby/commit/5a109635ed23731f3de680687afda687757b74b2))
* refactor loaders to handle recursive directories and explicit file type ([#44](https://github.com/AnimaApp/scooby/issues/44)) ([cbd29a6](https://github.com/AnimaApp/scooby/commit/cbd29a6b43d22a0bd97d9872b08a4a7a0cac8f5f))
* try adding mitigation for goto hang ([#67](https://github.com/AnimaApp/scooby/issues/67)) ([3958a81](https://github.com/AnimaApp/scooby/commit/3958a811ec5e979838ad0c7db8badaea7a8f2aec))





# 1.16.0 (2022-11-24)


### Bug Fixes

* add automatic retries for html screenshots ([#33](https://github.com/AnimaApp/scooby/issues/33)) and improve error reporting ([#35](https://github.com/AnimaApp/scooby/issues/35)) ([2eed87d](https://github.com/AnimaApp/scooby/commit/2eed87d5d1a1b68e212d27de4aa40b36a51ae440))
* build all CI command ([47af62a](https://github.com/AnimaApp/scooby/commit/47af62a01303fa01c96cad910a89f09adb5a688f))
* **core:** increase code diff buffer ([#80](https://github.com/AnimaApp/scooby/issues/80)) ([797886b](https://github.com/AnimaApp/scooby/commit/797886bb1c24c5891e3c3550330e587d351dafb0))
* main branch reviews leaking ([#42](https://github.com/AnimaApp/scooby/issues/42)) ([b7de30d](https://github.com/AnimaApp/scooby/commit/b7de30dd05b92490c9758fd33570a09801246a27))
* rename types to shared ([670d036](https://github.com/AnimaApp/scooby/commit/670d0362f871cfca46e636561ef2b637d0327ba0))
* screenshot timeout ([#55](https://github.com/AnimaApp/scooby/issues/55)) ([19190d5](https://github.com/AnimaApp/scooby/commit/19190d5d4f173a3b5e644470b14e536f9098c848))


### Features

* add approval UI ([#24](https://github.com/AnimaApp/scooby/issues/24)) ([a30b8f8](https://github.com/AnimaApp/scooby/commit/a30b8f830720d5e58859cef9db4a20c71dc68441))
* add approvals ([#20](https://github.com/AnimaApp/scooby/issues/20)) ([3b0f4ad](https://github.com/AnimaApp/scooby/commit/3b0f4adcf65819707a2d913a95583f9c91a5bc13))
* add core and types modules ([6c6581e](https://github.com/AnimaApp/scooby/commit/6c6581ef4e464d10405e4942dae059ec43b836a7))
* add fidelity-regression report ([#76](https://github.com/AnimaApp/scooby/issues/76)) ([97ff50b](https://github.com/AnimaApp/scooby/commit/97ff50b52ec9fea5e749e1bdb09778d5c1844620))
* add forked git resolution module ([8031a4a](https://github.com/AnimaApp/scooby/commit/8031a4a2bc421cba4976ebd4e0147884758eefb7))
* add logic to upload regression report to S3 ([9a3f6fe](https://github.com/AnimaApp/scooby/commit/9a3f6fe1e6f9f42e5156ffc7ce6bd03fa3faf9be))
* add Scooby CI tests ([#6](https://github.com/AnimaApp/scooby/issues/6)) ([28a916f](https://github.com/AnimaApp/scooby/commit/28a916f4155b03fee0704b1c53cca03b8502af78))
* add Scooby deploy to GH pages ([#5](https://github.com/AnimaApp/scooby/issues/5)) ([8a94f4c](https://github.com/AnimaApp/scooby/commit/8a94f4cc039647c6207d8419a11b8dc0029b15e8))
* add steps to publish packages ([#13](https://github.com/AnimaApp/scooby/issues/13)) ([eac5e33](https://github.com/AnimaApp/scooby/commit/eac5e33b2eb2ab0974466895ae40bd5ea2e985d8))
* add support for different file types ([#63](https://github.com/AnimaApp/scooby/issues/63)) ([e642bb0](https://github.com/AnimaApp/scooby/commit/e642bb0fa6f3c5da9d0f7f6bd696869029b766a7))
* add support for metadata fields ([#53](https://github.com/AnimaApp/scooby/issues/53)) ([243ab27](https://github.com/AnimaApp/scooby/commit/243ab2773dee551f0c82ed195bc38a33f2a0607f))
* add support for ZIP archives ([#72](https://github.com/AnimaApp/scooby/issues/72)) ([dc18721](https://github.com/AnimaApp/scooby/commit/dc18721957fecd7b1feb803940506ec758351bfa))
* add threshold to fidelity test ([#36](https://github.com/AnimaApp/scooby/issues/36)) ([d48c9b8](https://github.com/AnimaApp/scooby/commit/d48c9b8ec5530a5125a80869dae4a77df45d3840))
* **core:** add image diffing algorithms ([73a16e0](https://github.com/AnimaApp/scooby/commit/73a16e07defd2c5868aa5df9ba078b200a5b5fc4))
* **core:** add new loader mode for nested structure with multiple files ([#16](https://github.com/AnimaApp/scooby/issues/16)) ([4b36553](https://github.com/AnimaApp/scooby/commit/4b365538d61fc27684504516422c37ccadcca98c))
* **core:** implement image source loaders ([3a7f536](https://github.com/AnimaApp/scooby/commit/3a7f536e6e4a0c5e62c0f8ffd08172b9d5d0cacb))
* **core:** implement new screenshot logic ([#59](https://github.com/AnimaApp/scooby/issues/59)) ([562c3ed](https://github.com/AnimaApp/scooby/commit/562c3ed14f954811489dd2ea531c0dead3f487d0))
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
* increase screenshot logging to debug hard-to-reproduce problem in production ([#65](https://github.com/AnimaApp/scooby/issues/65)) ([51ff03e](https://github.com/AnimaApp/scooby/commit/51ff03e6912a4d3b87461e03d953b8f4451961bc))
* introduce code-based reports ([#32](https://github.com/AnimaApp/scooby/issues/32)) ([0a2c805](https://github.com/AnimaApp/scooby/commit/0a2c805bcbfe8cdd8b65b0bd553fcb290142a607))
* progress in the API implementation ([5a10963](https://github.com/AnimaApp/scooby/commit/5a109635ed23731f3de680687afda687757b74b2))
* refactor loaders to handle recursive directories and explicit file type ([#44](https://github.com/AnimaApp/scooby/issues/44)) ([cbd29a6](https://github.com/AnimaApp/scooby/commit/cbd29a6b43d22a0bd97d9872b08a4a7a0cac8f5f))
* try adding mitigation for goto hang ([#67](https://github.com/AnimaApp/scooby/issues/67)) ([3958a81](https://github.com/AnimaApp/scooby/commit/3958a811ec5e979838ad0c7db8badaea7a8f2aec))





# 1.15.0 (2022-11-17)


### Bug Fixes

* add automatic retries for html screenshots ([#33](https://github.com/AnimaApp/scooby/issues/33)) and improve error reporting ([#35](https://github.com/AnimaApp/scooby/issues/35)) ([2eed87d](https://github.com/AnimaApp/scooby/commit/2eed87d5d1a1b68e212d27de4aa40b36a51ae440))
* build all CI command ([47af62a](https://github.com/AnimaApp/scooby/commit/47af62a01303fa01c96cad910a89f09adb5a688f))
* main branch reviews leaking ([#42](https://github.com/AnimaApp/scooby/issues/42)) ([b7de30d](https://github.com/AnimaApp/scooby/commit/b7de30dd05b92490c9758fd33570a09801246a27))
* rename types to shared ([670d036](https://github.com/AnimaApp/scooby/commit/670d0362f871cfca46e636561ef2b637d0327ba0))
* screenshot timeout ([#55](https://github.com/AnimaApp/scooby/issues/55)) ([19190d5](https://github.com/AnimaApp/scooby/commit/19190d5d4f173a3b5e644470b14e536f9098c848))


### Features

* add approval UI ([#24](https://github.com/AnimaApp/scooby/issues/24)) ([a30b8f8](https://github.com/AnimaApp/scooby/commit/a30b8f830720d5e58859cef9db4a20c71dc68441))
* add approvals ([#20](https://github.com/AnimaApp/scooby/issues/20)) ([3b0f4ad](https://github.com/AnimaApp/scooby/commit/3b0f4adcf65819707a2d913a95583f9c91a5bc13))
* add core and types modules ([6c6581e](https://github.com/AnimaApp/scooby/commit/6c6581ef4e464d10405e4942dae059ec43b836a7))
* add fidelity-regression report ([#76](https://github.com/AnimaApp/scooby/issues/76)) ([97ff50b](https://github.com/AnimaApp/scooby/commit/97ff50b52ec9fea5e749e1bdb09778d5c1844620))
* add forked git resolution module ([8031a4a](https://github.com/AnimaApp/scooby/commit/8031a4a2bc421cba4976ebd4e0147884758eefb7))
* add logic to upload regression report to S3 ([9a3f6fe](https://github.com/AnimaApp/scooby/commit/9a3f6fe1e6f9f42e5156ffc7ce6bd03fa3faf9be))
* add Scooby CI tests ([#6](https://github.com/AnimaApp/scooby/issues/6)) ([28a916f](https://github.com/AnimaApp/scooby/commit/28a916f4155b03fee0704b1c53cca03b8502af78))
* add Scooby deploy to GH pages ([#5](https://github.com/AnimaApp/scooby/issues/5)) ([8a94f4c](https://github.com/AnimaApp/scooby/commit/8a94f4cc039647c6207d8419a11b8dc0029b15e8))
* add steps to publish packages ([#13](https://github.com/AnimaApp/scooby/issues/13)) ([eac5e33](https://github.com/AnimaApp/scooby/commit/eac5e33b2eb2ab0974466895ae40bd5ea2e985d8))
* add support for different file types ([#63](https://github.com/AnimaApp/scooby/issues/63)) ([e642bb0](https://github.com/AnimaApp/scooby/commit/e642bb0fa6f3c5da9d0f7f6bd696869029b766a7))
* add support for metadata fields ([#53](https://github.com/AnimaApp/scooby/issues/53)) ([243ab27](https://github.com/AnimaApp/scooby/commit/243ab2773dee551f0c82ed195bc38a33f2a0607f))
* add support for ZIP archives ([#72](https://github.com/AnimaApp/scooby/issues/72)) ([dc18721](https://github.com/AnimaApp/scooby/commit/dc18721957fecd7b1feb803940506ec758351bfa))
* add threshold to fidelity test ([#36](https://github.com/AnimaApp/scooby/issues/36)) ([d48c9b8](https://github.com/AnimaApp/scooby/commit/d48c9b8ec5530a5125a80869dae4a77df45d3840))
* **core:** add image diffing algorithms ([73a16e0](https://github.com/AnimaApp/scooby/commit/73a16e07defd2c5868aa5df9ba078b200a5b5fc4))
* **core:** add new loader mode for nested structure with multiple files ([#16](https://github.com/AnimaApp/scooby/issues/16)) ([4b36553](https://github.com/AnimaApp/scooby/commit/4b365538d61fc27684504516422c37ccadcca98c))
* **core:** implement image source loaders ([3a7f536](https://github.com/AnimaApp/scooby/commit/3a7f536e6e4a0c5e62c0f8ffd08172b9d5d0cacb))
* **core:** implement new screenshot logic ([#59](https://github.com/AnimaApp/scooby/issues/59)) ([562c3ed](https://github.com/AnimaApp/scooby/commit/562c3ed14f954811489dd2ea531c0dead3f487d0))
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
* increase screenshot logging to debug hard-to-reproduce problem in production ([#65](https://github.com/AnimaApp/scooby/issues/65)) ([51ff03e](https://github.com/AnimaApp/scooby/commit/51ff03e6912a4d3b87461e03d953b8f4451961bc))
* introduce code-based reports ([#32](https://github.com/AnimaApp/scooby/issues/32)) ([0a2c805](https://github.com/AnimaApp/scooby/commit/0a2c805bcbfe8cdd8b65b0bd553fcb290142a607))
* progress in the API implementation ([5a10963](https://github.com/AnimaApp/scooby/commit/5a109635ed23731f3de680687afda687757b74b2))
* refactor loaders to handle recursive directories and explicit file type ([#44](https://github.com/AnimaApp/scooby/issues/44)) ([cbd29a6](https://github.com/AnimaApp/scooby/commit/cbd29a6b43d22a0bd97d9872b08a4a7a0cac8f5f))
* try adding mitigation for goto hang ([#67](https://github.com/AnimaApp/scooby/issues/67)) ([3958a81](https://github.com/AnimaApp/scooby/commit/3958a811ec5e979838ad0c7db8badaea7a8f2aec))





# 1.14.0 (2022-11-15)


### Bug Fixes

* add automatic retries for html screenshots ([#33](https://github.com/AnimaApp/scooby/issues/33)) and improve error reporting ([#35](https://github.com/AnimaApp/scooby/issues/35)) ([2eed87d](https://github.com/AnimaApp/scooby/commit/2eed87d5d1a1b68e212d27de4aa40b36a51ae440))
* build all CI command ([47af62a](https://github.com/AnimaApp/scooby/commit/47af62a01303fa01c96cad910a89f09adb5a688f))
* main branch reviews leaking ([#42](https://github.com/AnimaApp/scooby/issues/42)) ([b7de30d](https://github.com/AnimaApp/scooby/commit/b7de30dd05b92490c9758fd33570a09801246a27))
* rename types to shared ([670d036](https://github.com/AnimaApp/scooby/commit/670d0362f871cfca46e636561ef2b637d0327ba0))
* screenshot timeout ([#55](https://github.com/AnimaApp/scooby/issues/55)) ([19190d5](https://github.com/AnimaApp/scooby/commit/19190d5d4f173a3b5e644470b14e536f9098c848))


### Features

* add approval UI ([#24](https://github.com/AnimaApp/scooby/issues/24)) ([a30b8f8](https://github.com/AnimaApp/scooby/commit/a30b8f830720d5e58859cef9db4a20c71dc68441))
* add approvals ([#20](https://github.com/AnimaApp/scooby/issues/20)) ([3b0f4ad](https://github.com/AnimaApp/scooby/commit/3b0f4adcf65819707a2d913a95583f9c91a5bc13))
* add core and types modules ([6c6581e](https://github.com/AnimaApp/scooby/commit/6c6581ef4e464d10405e4942dae059ec43b836a7))
* add forked git resolution module ([8031a4a](https://github.com/AnimaApp/scooby/commit/8031a4a2bc421cba4976ebd4e0147884758eefb7))
* add logic to upload regression report to S3 ([9a3f6fe](https://github.com/AnimaApp/scooby/commit/9a3f6fe1e6f9f42e5156ffc7ce6bd03fa3faf9be))
* add Scooby CI tests ([#6](https://github.com/AnimaApp/scooby/issues/6)) ([28a916f](https://github.com/AnimaApp/scooby/commit/28a916f4155b03fee0704b1c53cca03b8502af78))
* add Scooby deploy to GH pages ([#5](https://github.com/AnimaApp/scooby/issues/5)) ([8a94f4c](https://github.com/AnimaApp/scooby/commit/8a94f4cc039647c6207d8419a11b8dc0029b15e8))
* add steps to publish packages ([#13](https://github.com/AnimaApp/scooby/issues/13)) ([eac5e33](https://github.com/AnimaApp/scooby/commit/eac5e33b2eb2ab0974466895ae40bd5ea2e985d8))
* add support for different file types ([#63](https://github.com/AnimaApp/scooby/issues/63)) ([e642bb0](https://github.com/AnimaApp/scooby/commit/e642bb0fa6f3c5da9d0f7f6bd696869029b766a7))
* add support for metadata fields ([#53](https://github.com/AnimaApp/scooby/issues/53)) ([243ab27](https://github.com/AnimaApp/scooby/commit/243ab2773dee551f0c82ed195bc38a33f2a0607f))
* add support for ZIP archives ([#72](https://github.com/AnimaApp/scooby/issues/72)) ([dc18721](https://github.com/AnimaApp/scooby/commit/dc18721957fecd7b1feb803940506ec758351bfa))
* add threshold to fidelity test ([#36](https://github.com/AnimaApp/scooby/issues/36)) ([d48c9b8](https://github.com/AnimaApp/scooby/commit/d48c9b8ec5530a5125a80869dae4a77df45d3840))
* **core:** add image diffing algorithms ([73a16e0](https://github.com/AnimaApp/scooby/commit/73a16e07defd2c5868aa5df9ba078b200a5b5fc4))
* **core:** add new loader mode for nested structure with multiple files ([#16](https://github.com/AnimaApp/scooby/issues/16)) ([4b36553](https://github.com/AnimaApp/scooby/commit/4b365538d61fc27684504516422c37ccadcca98c))
* **core:** implement image source loaders ([3a7f536](https://github.com/AnimaApp/scooby/commit/3a7f536e6e4a0c5e62c0f8ffd08172b9d5d0cacb))
* **core:** implement new screenshot logic ([#59](https://github.com/AnimaApp/scooby/issues/59)) ([562c3ed](https://github.com/AnimaApp/scooby/commit/562c3ed14f954811489dd2ea531c0dead3f487d0))
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
* increase screenshot logging to debug hard-to-reproduce problem in production ([#65](https://github.com/AnimaApp/scooby/issues/65)) ([51ff03e](https://github.com/AnimaApp/scooby/commit/51ff03e6912a4d3b87461e03d953b8f4451961bc))
* introduce code-based reports ([#32](https://github.com/AnimaApp/scooby/issues/32)) ([0a2c805](https://github.com/AnimaApp/scooby/commit/0a2c805bcbfe8cdd8b65b0bd553fcb290142a607))
* progress in the API implementation ([5a10963](https://github.com/AnimaApp/scooby/commit/5a109635ed23731f3de680687afda687757b74b2))
* refactor loaders to handle recursive directories and explicit file type ([#44](https://github.com/AnimaApp/scooby/issues/44)) ([cbd29a6](https://github.com/AnimaApp/scooby/commit/cbd29a6b43d22a0bd97d9872b08a4a7a0cac8f5f))
* try adding mitigation for goto hang ([#67](https://github.com/AnimaApp/scooby/issues/67)) ([3958a81](https://github.com/AnimaApp/scooby/commit/3958a811ec5e979838ad0c7db8badaea7a8f2aec))





# 1.13.0 (2022-11-11)


### Bug Fixes

* add automatic retries for html screenshots ([#33](https://github.com/AnimaApp/scooby/issues/33)) and improve error reporting ([#35](https://github.com/AnimaApp/scooby/issues/35)) ([2eed87d](https://github.com/AnimaApp/scooby/commit/2eed87d5d1a1b68e212d27de4aa40b36a51ae440))
* build all CI command ([47af62a](https://github.com/AnimaApp/scooby/commit/47af62a01303fa01c96cad910a89f09adb5a688f))
* main branch reviews leaking ([#42](https://github.com/AnimaApp/scooby/issues/42)) ([b7de30d](https://github.com/AnimaApp/scooby/commit/b7de30dd05b92490c9758fd33570a09801246a27))
* rename types to shared ([670d036](https://github.com/AnimaApp/scooby/commit/670d0362f871cfca46e636561ef2b637d0327ba0))
* screenshot timeout ([#55](https://github.com/AnimaApp/scooby/issues/55)) ([19190d5](https://github.com/AnimaApp/scooby/commit/19190d5d4f173a3b5e644470b14e536f9098c848))


### Features

* add approval UI ([#24](https://github.com/AnimaApp/scooby/issues/24)) ([a30b8f8](https://github.com/AnimaApp/scooby/commit/a30b8f830720d5e58859cef9db4a20c71dc68441))
* add approvals ([#20](https://github.com/AnimaApp/scooby/issues/20)) ([3b0f4ad](https://github.com/AnimaApp/scooby/commit/3b0f4adcf65819707a2d913a95583f9c91a5bc13))
* add core and types modules ([6c6581e](https://github.com/AnimaApp/scooby/commit/6c6581ef4e464d10405e4942dae059ec43b836a7))
* add forked git resolution module ([8031a4a](https://github.com/AnimaApp/scooby/commit/8031a4a2bc421cba4976ebd4e0147884758eefb7))
* add logic to upload regression report to S3 ([9a3f6fe](https://github.com/AnimaApp/scooby/commit/9a3f6fe1e6f9f42e5156ffc7ce6bd03fa3faf9be))
* add Scooby CI tests ([#6](https://github.com/AnimaApp/scooby/issues/6)) ([28a916f](https://github.com/AnimaApp/scooby/commit/28a916f4155b03fee0704b1c53cca03b8502af78))
* add Scooby deploy to GH pages ([#5](https://github.com/AnimaApp/scooby/issues/5)) ([8a94f4c](https://github.com/AnimaApp/scooby/commit/8a94f4cc039647c6207d8419a11b8dc0029b15e8))
* add steps to publish packages ([#13](https://github.com/AnimaApp/scooby/issues/13)) ([eac5e33](https://github.com/AnimaApp/scooby/commit/eac5e33b2eb2ab0974466895ae40bd5ea2e985d8))
* add support for different file types ([#63](https://github.com/AnimaApp/scooby/issues/63)) ([e642bb0](https://github.com/AnimaApp/scooby/commit/e642bb0fa6f3c5da9d0f7f6bd696869029b766a7))
* add support for metadata fields ([#53](https://github.com/AnimaApp/scooby/issues/53)) ([243ab27](https://github.com/AnimaApp/scooby/commit/243ab2773dee551f0c82ed195bc38a33f2a0607f))
* add threshold to fidelity test ([#36](https://github.com/AnimaApp/scooby/issues/36)) ([d48c9b8](https://github.com/AnimaApp/scooby/commit/d48c9b8ec5530a5125a80869dae4a77df45d3840))
* **core:** add image diffing algorithms ([73a16e0](https://github.com/AnimaApp/scooby/commit/73a16e07defd2c5868aa5df9ba078b200a5b5fc4))
* **core:** add new loader mode for nested structure with multiple files ([#16](https://github.com/AnimaApp/scooby/issues/16)) ([4b36553](https://github.com/AnimaApp/scooby/commit/4b365538d61fc27684504516422c37ccadcca98c))
* **core:** implement image source loaders ([3a7f536](https://github.com/AnimaApp/scooby/commit/3a7f536e6e4a0c5e62c0f8ffd08172b9d5d0cacb))
* **core:** implement new screenshot logic ([#59](https://github.com/AnimaApp/scooby/issues/59)) ([562c3ed](https://github.com/AnimaApp/scooby/commit/562c3ed14f954811489dd2ea531c0dead3f487d0))
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
* increase screenshot logging to debug hard-to-reproduce problem in production ([#65](https://github.com/AnimaApp/scooby/issues/65)) ([51ff03e](https://github.com/AnimaApp/scooby/commit/51ff03e6912a4d3b87461e03d953b8f4451961bc))
* introduce code-based reports ([#32](https://github.com/AnimaApp/scooby/issues/32)) ([0a2c805](https://github.com/AnimaApp/scooby/commit/0a2c805bcbfe8cdd8b65b0bd553fcb290142a607))
* progress in the API implementation ([5a10963](https://github.com/AnimaApp/scooby/commit/5a109635ed23731f3de680687afda687757b74b2))
* refactor loaders to handle recursive directories and explicit file type ([#44](https://github.com/AnimaApp/scooby/issues/44)) ([cbd29a6](https://github.com/AnimaApp/scooby/commit/cbd29a6b43d22a0bd97d9872b08a4a7a0cac8f5f))
* try adding mitigation for goto hang ([#67](https://github.com/AnimaApp/scooby/issues/67)) ([3958a81](https://github.com/AnimaApp/scooby/commit/3958a811ec5e979838ad0c7db8badaea7a8f2aec))





# 1.12.0 (2022-11-11)


### Bug Fixes

* add automatic retries for html screenshots ([#33](https://github.com/AnimaApp/scooby/issues/33)) and improve error reporting ([#35](https://github.com/AnimaApp/scooby/issues/35)) ([2eed87d](https://github.com/AnimaApp/scooby/commit/2eed87d5d1a1b68e212d27de4aa40b36a51ae440))
* build all CI command ([47af62a](https://github.com/AnimaApp/scooby/commit/47af62a01303fa01c96cad910a89f09adb5a688f))
* main branch reviews leaking ([#42](https://github.com/AnimaApp/scooby/issues/42)) ([b7de30d](https://github.com/AnimaApp/scooby/commit/b7de30dd05b92490c9758fd33570a09801246a27))
* rename types to shared ([670d036](https://github.com/AnimaApp/scooby/commit/670d0362f871cfca46e636561ef2b637d0327ba0))
* screenshot timeout ([#55](https://github.com/AnimaApp/scooby/issues/55)) ([19190d5](https://github.com/AnimaApp/scooby/commit/19190d5d4f173a3b5e644470b14e536f9098c848))


### Features

* add approval UI ([#24](https://github.com/AnimaApp/scooby/issues/24)) ([a30b8f8](https://github.com/AnimaApp/scooby/commit/a30b8f830720d5e58859cef9db4a20c71dc68441))
* add approvals ([#20](https://github.com/AnimaApp/scooby/issues/20)) ([3b0f4ad](https://github.com/AnimaApp/scooby/commit/3b0f4adcf65819707a2d913a95583f9c91a5bc13))
* add core and types modules ([6c6581e](https://github.com/AnimaApp/scooby/commit/6c6581ef4e464d10405e4942dae059ec43b836a7))
* add forked git resolution module ([8031a4a](https://github.com/AnimaApp/scooby/commit/8031a4a2bc421cba4976ebd4e0147884758eefb7))
* add logic to upload regression report to S3 ([9a3f6fe](https://github.com/AnimaApp/scooby/commit/9a3f6fe1e6f9f42e5156ffc7ce6bd03fa3faf9be))
* add Scooby CI tests ([#6](https://github.com/AnimaApp/scooby/issues/6)) ([28a916f](https://github.com/AnimaApp/scooby/commit/28a916f4155b03fee0704b1c53cca03b8502af78))
* add Scooby deploy to GH pages ([#5](https://github.com/AnimaApp/scooby/issues/5)) ([8a94f4c](https://github.com/AnimaApp/scooby/commit/8a94f4cc039647c6207d8419a11b8dc0029b15e8))
* add steps to publish packages ([#13](https://github.com/AnimaApp/scooby/issues/13)) ([eac5e33](https://github.com/AnimaApp/scooby/commit/eac5e33b2eb2ab0974466895ae40bd5ea2e985d8))
* add support for different file types ([#63](https://github.com/AnimaApp/scooby/issues/63)) ([e642bb0](https://github.com/AnimaApp/scooby/commit/e642bb0fa6f3c5da9d0f7f6bd696869029b766a7))
* add support for metadata fields ([#53](https://github.com/AnimaApp/scooby/issues/53)) ([243ab27](https://github.com/AnimaApp/scooby/commit/243ab2773dee551f0c82ed195bc38a33f2a0607f))
* add threshold to fidelity test ([#36](https://github.com/AnimaApp/scooby/issues/36)) ([d48c9b8](https://github.com/AnimaApp/scooby/commit/d48c9b8ec5530a5125a80869dae4a77df45d3840))
* **core:** add image diffing algorithms ([73a16e0](https://github.com/AnimaApp/scooby/commit/73a16e07defd2c5868aa5df9ba078b200a5b5fc4))
* **core:** add new loader mode for nested structure with multiple files ([#16](https://github.com/AnimaApp/scooby/issues/16)) ([4b36553](https://github.com/AnimaApp/scooby/commit/4b365538d61fc27684504516422c37ccadcca98c))
* **core:** implement image source loaders ([3a7f536](https://github.com/AnimaApp/scooby/commit/3a7f536e6e4a0c5e62c0f8ffd08172b9d5d0cacb))
* **core:** implement new screenshot logic ([#59](https://github.com/AnimaApp/scooby/issues/59)) ([562c3ed](https://github.com/AnimaApp/scooby/commit/562c3ed14f954811489dd2ea531c0dead3f487d0))
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
* increase screenshot logging to debug hard-to-reproduce problem in production ([#65](https://github.com/AnimaApp/scooby/issues/65)) ([51ff03e](https://github.com/AnimaApp/scooby/commit/51ff03e6912a4d3b87461e03d953b8f4451961bc))
* introduce code-based reports ([#32](https://github.com/AnimaApp/scooby/issues/32)) ([0a2c805](https://github.com/AnimaApp/scooby/commit/0a2c805bcbfe8cdd8b65b0bd553fcb290142a607))
* progress in the API implementation ([5a10963](https://github.com/AnimaApp/scooby/commit/5a109635ed23731f3de680687afda687757b74b2))
* refactor loaders to handle recursive directories and explicit file type ([#44](https://github.com/AnimaApp/scooby/issues/44)) ([cbd29a6](https://github.com/AnimaApp/scooby/commit/cbd29a6b43d22a0bd97d9872b08a4a7a0cac8f5f))





# 1.11.0 (2022-11-10)


### Bug Fixes

* add automatic retries for html screenshots ([#33](https://github.com/AnimaApp/scooby/issues/33)) and improve error reporting ([#35](https://github.com/AnimaApp/scooby/issues/35)) ([2eed87d](https://github.com/AnimaApp/scooby/commit/2eed87d5d1a1b68e212d27de4aa40b36a51ae440))
* build all CI command ([47af62a](https://github.com/AnimaApp/scooby/commit/47af62a01303fa01c96cad910a89f09adb5a688f))
* main branch reviews leaking ([#42](https://github.com/AnimaApp/scooby/issues/42)) ([b7de30d](https://github.com/AnimaApp/scooby/commit/b7de30dd05b92490c9758fd33570a09801246a27))
* rename types to shared ([670d036](https://github.com/AnimaApp/scooby/commit/670d0362f871cfca46e636561ef2b637d0327ba0))
* screenshot timeout ([#55](https://github.com/AnimaApp/scooby/issues/55)) ([19190d5](https://github.com/AnimaApp/scooby/commit/19190d5d4f173a3b5e644470b14e536f9098c848))


### Features

* add approval UI ([#24](https://github.com/AnimaApp/scooby/issues/24)) ([a30b8f8](https://github.com/AnimaApp/scooby/commit/a30b8f830720d5e58859cef9db4a20c71dc68441))
* add approvals ([#20](https://github.com/AnimaApp/scooby/issues/20)) ([3b0f4ad](https://github.com/AnimaApp/scooby/commit/3b0f4adcf65819707a2d913a95583f9c91a5bc13))
* add core and types modules ([6c6581e](https://github.com/AnimaApp/scooby/commit/6c6581ef4e464d10405e4942dae059ec43b836a7))
* add forked git resolution module ([8031a4a](https://github.com/AnimaApp/scooby/commit/8031a4a2bc421cba4976ebd4e0147884758eefb7))
* add logic to upload regression report to S3 ([9a3f6fe](https://github.com/AnimaApp/scooby/commit/9a3f6fe1e6f9f42e5156ffc7ce6bd03fa3faf9be))
* add Scooby CI tests ([#6](https://github.com/AnimaApp/scooby/issues/6)) ([28a916f](https://github.com/AnimaApp/scooby/commit/28a916f4155b03fee0704b1c53cca03b8502af78))
* add Scooby deploy to GH pages ([#5](https://github.com/AnimaApp/scooby/issues/5)) ([8a94f4c](https://github.com/AnimaApp/scooby/commit/8a94f4cc039647c6207d8419a11b8dc0029b15e8))
* add steps to publish packages ([#13](https://github.com/AnimaApp/scooby/issues/13)) ([eac5e33](https://github.com/AnimaApp/scooby/commit/eac5e33b2eb2ab0974466895ae40bd5ea2e985d8))
* add support for metadata fields ([#53](https://github.com/AnimaApp/scooby/issues/53)) ([243ab27](https://github.com/AnimaApp/scooby/commit/243ab2773dee551f0c82ed195bc38a33f2a0607f))
* add threshold to fidelity test ([#36](https://github.com/AnimaApp/scooby/issues/36)) ([d48c9b8](https://github.com/AnimaApp/scooby/commit/d48c9b8ec5530a5125a80869dae4a77df45d3840))
* **core:** add image diffing algorithms ([73a16e0](https://github.com/AnimaApp/scooby/commit/73a16e07defd2c5868aa5df9ba078b200a5b5fc4))
* **core:** add new loader mode for nested structure with multiple files ([#16](https://github.com/AnimaApp/scooby/issues/16)) ([4b36553](https://github.com/AnimaApp/scooby/commit/4b365538d61fc27684504516422c37ccadcca98c))
* **core:** implement image source loaders ([3a7f536](https://github.com/AnimaApp/scooby/commit/3a7f536e6e4a0c5e62c0f8ffd08172b9d5d0cacb))
* **core:** implement new screenshot logic ([#59](https://github.com/AnimaApp/scooby/issues/59)) ([562c3ed](https://github.com/AnimaApp/scooby/commit/562c3ed14f954811489dd2ea531c0dead3f487d0))
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
* refactor loaders to handle recursive directories and explicit file type ([#44](https://github.com/AnimaApp/scooby/issues/44)) ([cbd29a6](https://github.com/AnimaApp/scooby/commit/cbd29a6b43d22a0bd97d9872b08a4a7a0cac8f5f))





# 1.10.0 (2022-11-09)


### Bug Fixes

* add automatic retries for html screenshots ([#33](https://github.com/AnimaApp/scooby/issues/33)) and improve error reporting ([#35](https://github.com/AnimaApp/scooby/issues/35)) ([2eed87d](https://github.com/AnimaApp/scooby/commit/2eed87d5d1a1b68e212d27de4aa40b36a51ae440))
* build all CI command ([47af62a](https://github.com/AnimaApp/scooby/commit/47af62a01303fa01c96cad910a89f09adb5a688f))
* main branch reviews leaking ([#42](https://github.com/AnimaApp/scooby/issues/42)) ([b7de30d](https://github.com/AnimaApp/scooby/commit/b7de30dd05b92490c9758fd33570a09801246a27))
* rename types to shared ([670d036](https://github.com/AnimaApp/scooby/commit/670d0362f871cfca46e636561ef2b637d0327ba0))
* screenshot timeout ([#55](https://github.com/AnimaApp/scooby/issues/55)) ([19190d5](https://github.com/AnimaApp/scooby/commit/19190d5d4f173a3b5e644470b14e536f9098c848))


### Features

* add approval UI ([#24](https://github.com/AnimaApp/scooby/issues/24)) ([a30b8f8](https://github.com/AnimaApp/scooby/commit/a30b8f830720d5e58859cef9db4a20c71dc68441))
* add approvals ([#20](https://github.com/AnimaApp/scooby/issues/20)) ([3b0f4ad](https://github.com/AnimaApp/scooby/commit/3b0f4adcf65819707a2d913a95583f9c91a5bc13))
* add core and types modules ([6c6581e](https://github.com/AnimaApp/scooby/commit/6c6581ef4e464d10405e4942dae059ec43b836a7))
* add forked git resolution module ([8031a4a](https://github.com/AnimaApp/scooby/commit/8031a4a2bc421cba4976ebd4e0147884758eefb7))
* add logic to upload regression report to S3 ([9a3f6fe](https://github.com/AnimaApp/scooby/commit/9a3f6fe1e6f9f42e5156ffc7ce6bd03fa3faf9be))
* add Scooby CI tests ([#6](https://github.com/AnimaApp/scooby/issues/6)) ([28a916f](https://github.com/AnimaApp/scooby/commit/28a916f4155b03fee0704b1c53cca03b8502af78))
* add Scooby deploy to GH pages ([#5](https://github.com/AnimaApp/scooby/issues/5)) ([8a94f4c](https://github.com/AnimaApp/scooby/commit/8a94f4cc039647c6207d8419a11b8dc0029b15e8))
* add steps to publish packages ([#13](https://github.com/AnimaApp/scooby/issues/13)) ([eac5e33](https://github.com/AnimaApp/scooby/commit/eac5e33b2eb2ab0974466895ae40bd5ea2e985d8))
* add support for metadata fields ([#53](https://github.com/AnimaApp/scooby/issues/53)) ([243ab27](https://github.com/AnimaApp/scooby/commit/243ab2773dee551f0c82ed195bc38a33f2a0607f))
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
* refactor loaders to handle recursive directories and explicit file type ([#44](https://github.com/AnimaApp/scooby/issues/44)) ([cbd29a6](https://github.com/AnimaApp/scooby/commit/cbd29a6b43d22a0bd97d9872b08a4a7a0cac8f5f))





# 1.9.0 (2022-11-09)


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
* add support for metadata fields ([#53](https://github.com/AnimaApp/scooby/issues/53)) ([243ab27](https://github.com/AnimaApp/scooby/commit/243ab2773dee551f0c82ed195bc38a33f2a0607f))
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
* refactor loaders to handle recursive directories and explicit file type ([#44](https://github.com/AnimaApp/scooby/issues/44)) ([cbd29a6](https://github.com/AnimaApp/scooby/commit/cbd29a6b43d22a0bd97d9872b08a4a7a0cac8f5f))





# 1.8.0 (2022-11-04)


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
* refactor loaders to handle recursive directories and explicit file type ([#44](https://github.com/AnimaApp/scooby/issues/44)) ([cbd29a6](https://github.com/AnimaApp/scooby/commit/cbd29a6b43d22a0bd97d9872b08a4a7a0cac8f5f))





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
