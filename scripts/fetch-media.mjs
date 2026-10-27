import { mkdir, writeFile } from "node:fs/promises";

const CDN = "https://cdn.prod.website-files.com/623381c2c01066b228a1670b/";

const pairs = [
  // fonts
  ["6233b3d5dc6c8b84f7cb1ce0_ABCWhyteInktrap-Light.woff2", "app/fonts/Whyte-Light.woff2"],
  ["6238bb4d522b761f9cdccd94_ABCWhyteInktrap-Regular.woff2", "app/fonts/Whyte-Regular.woff2"],
  ["6630a0058fd4294c3d514fb4_ABCWhyteInktrap-Medium.woff2", "app/fonts/Whyte-Medium.woff2"],
  ["6233b3db7a06db4a1e5a52e8_ABCWhyteInktrap-Bold.woff2", "app/fonts/Whyte-Bold.woff2"],
  ["66302630b2d8ae4b9a028491_ABCWhyteInktrapMono-Regular.woff2", "app/fonts/WhyteMono-Regular.woff2"],
  ["663025735e6d4545bd31645d_GrandSlang-Italic.woff2", "app/fonts/GrandSlang-Italic.woff2"],
  ["6630261e28ac29dd79878a38_GrandSlang-Roman.woff2", "app/fonts/GrandSlang-Roman.woff2"],
  // hero
  ["https://cdn.prod.website-files.com/623381c2c01066b228a1670b%2F66c8e4dabc8311f5a755963e_Homepage_Hero_compressed%20%282%29-transcode.mp4", "public/media/hero.mp4"],
  ["https://cdn.prod.website-files.com/623381c2c01066b228a1670b%2F66c8e4dabc8311f5a755963e_Homepage_Hero_compressed%20%282%29-poster-00001.jpg", "public/media/hero-poster.jpg"],
  ["https://cdn.dope.security/gen1-video.mp4", "public/media/gen1.mp4"],
  ["https://cdn.dope.security/gen2-video.mp4", "public/media/gen2.mp4"],
  // ticket + icons
  ["663877c7512cabfb3b00045b_boarding-pass-home-2.svg", "public/media/boarding-pass.svg"],
  ["66386f550ef3b41c61278bdf_u-image-contain.svg", "public/media/ticket-icon.svg"],
  ["66386db1d97c361d51ed66f6_barcode.svg", "public/media/barcode.svg"],
  ["662fee058fa18fc8a5fcd849_btn-google.webp", "public/media/btn-google.webp"],
  ["662fee058fa18fc8a5fcd87d_btn-microsoft.webp", "public/media/btn-microsoft.webp"],
  // gen panels
  ["662fee0b8fa18fc8a5fce0f4_panel-1-img.png", "public/media/gen1-box.png"],
  ["662fee058fa18fc8a5fcd8ef_windows.webp", "public/media/cabin.webp"],
  ["663a95fa117c98c1c008d3de_laptop%20(1).webp", "public/media/laptop.webp"],
  ["66a801ff0c751c72a677bfc6_globe%402x.svg", "public/media/globe.svg"],
  ["66a801e9c2e6a69af9795dde_spin-ring.svg", "public/media/spin-ring.svg"],
  ["66a801af2b173391cc31c0c9_swg_box.svg", "public/media/swg-box.svg"],
  ["66a82fd07e02ab89712baffe_airplane-down.svg", "public/media/airplane.svg"],
  // cisos
  ["66a8396b0c49b8d4c57d937c_cisos_background_new%20(2).webp", "public/media/cisos-bg.webp"],
  ["66cd3b5172348bff063d9ef8_podcast%20player%20michael.webp", "public/media/pod-michael.webp"],
  ["66cd3b51a7892386858dfee2_podcast%20player%20rohit.webp", "public/media/pod-rohit.webp"],
  ["66cd3b51bb7a533e73d9ba30_podcast%20player%20david.webp", "public/media/pod-david.webp"],
  ["66cd3b51b825b3306c8e3d5d_podcast%20player%20royce.webp", "public/media/pod-royce.webp"],
  // trilogy
  ["66d75d944015595922872b6c_LATEST-swg-home.webp", "public/media/trilogy-swg.webp"],
  ["68da2b14031e2a03f7d49bb3_SWG%20DLP%402x.png", "public/media/trilogy-dlp.png"],
  ["66d75c421ad6222183cc9130_hp-screens-casb_hero%402x%20(2).webp", "public/media/trilogy-casb.webp"],
  ["662fee068fa18fc8a5fcdb28_ui%20google.webp", "public/media/chip-google.webp"],
  ["662fee078fa18fc8a5fcdb59_ui%20progress.webp", "public/media/chip-progress.webp"],
  ["662fee078fa18fc8a5fcdb4e_ui%20micrsoft%20365.webp", "public/media/chip-m365.webp"],
  ["662fee068fa18fc8a5fcda45_ui%20slack.webp", "public/media/chip-slack.webp"],
  ["662fee068fa18fc8a5fcda8b_ui%20chatgpt.webp", "public/media/chip-chatgpt.webp"],
  ["662fee078fa18fc8a5fcdb66_analytics.webp", "public/media/chip-analytics.webp"],
  // compare
  ["663d520e1b3c8b15401f842a_comparison-card-1.webp", "public/media/cmp-1.webp"],
  ["663d522c0e597c61c5f43417_comparison-card-2.webp", "public/media/cmp-2.webp"],
  ["663d5245cd87ae0fc5e2b2a2_comparison-card-3.webp", "public/media/cmp-3.webp"],
  // trial + footer
  ["663d6ca3fa159fb0e4fd2ca0_footer-background.webp", "public/media/bloom.webp"],
  ["6633bb7826c1ebe652084f6d_compare.svg", "public/media/compare-glyph.svg"],
  ["663d73a405a6a36d0e0a447a_arrow-big.svg", "public/media/arrow-big.svg"],
  ["63919307f08882ffdeb15669_soc2-badgeoutlined.svg", "public/media/soc2.svg"],
  ["62b4ddca9278e09a3659d6d2_ds-favicon-32px.png", "app/icon.png"],
];

for (const [remote, local] of pairs) {
  const url = remote.startsWith("http") ? remote : CDN + remote;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  await mkdir(local.slice(0, local.lastIndexOf("/")), { recursive: true });
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(local, buf);
  console.log(local, buf.length);
}
