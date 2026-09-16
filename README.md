# 강산재 홈페이지

한국어·영어 22개 경로로 구성한 Next.js App Router 홈페이지입니다.

## 실행

```bash
pnpm install
pnpm dev
```

`http://localhost:3000`을 열면 `/ko`로 이동합니다. 배포 전 `pnpm build`와 `pnpm typecheck`를 실행하세요.

## Netlify 배포

저장소 루트에 `package.json`, `pnpm-lock.yaml`, `netlify.toml`이 있습니다. Netlify 설정은 `netlify.toml`에서 Base directory `.`(저장소 루트), Build command `pnpm build`, Publish directory `.next`로 고정합니다. Next.js 연동은 Netlify의 자동 OpenNext 어댑터를 사용합니다. Git 저장소를 연결하고 `main`의 새 커밋을 배포하세요. 실제 도메인이 확정되면 `NEXT_PUBLIC_SITE_URL`을 설정하세요.

Vercel에서는 `package.json`이 있는 저장소 루트(`.`)를 Root Directory로 선택하세요. `vercel.json`이 Framework Preset을 Next.js로 지정합니다.

화면 검수는 `pnpm start` 실행 중 `node scripts/qa.mjs`로 반복할 수 있습니다. 설치된 Chrome이 없으면 Playwright의 Chromium 설치가 필요합니다.

예약 상품·SNS·주소는 `lib/site.ts`에서 관리합니다. 미확인 운영 정보는 `ToDo.md`에 모았습니다. 이미지 대응표는 `public/images/README.md`에 있습니다.
