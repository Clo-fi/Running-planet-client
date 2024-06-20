# Running Planet - Client

![대표사진](/public/logo/icon-512x512.png)

**_러닝플래닛(RunningPlanet)_** 은 구름톤 트레이닝 2차 기업 연계 프로젝트입니다.<br/>

##### 다 같이 활동하는 러닝 크루를 시간, 장소 등과 같이 물리적인 제약에서 벗어나 온라인 으로 즐길 수 있는 크루 활동을 기반으로 <br/>사용자의 운동욕구 충족과 동기부여를 할 수 있는 러닝 크루 프로젝트입니다.

## Running Planet from Clo-fi

- 프로젝트 진행 기간: 2024.05.03 ~
- https://runple.site
- https://www.notion.so/1-Clo-Fi-25872e6d1be34dc7a1b66776c3a09e31

## Team

|  팀원  |     역할     |
| :----: | :----------: |
| 김예린 |    프론트    |
| 김민지 | 프론트(취업) |
| 한우혁 |    프론트    |
| 김용빈 |    백엔드    |
| 권지환 |    백엔드    |
| 이민규 |    백엔드    |
| 이혁준 |    백엔드    |
| 김재준 |   디자이너   |

## Process Architecture

![사진5](/public/readmeImgs/architecture.png)

## Front-End Tech Stack

- React
- typescript
- zustand
- axios
- tanstack
- vite
- pwa

## Deploy

- AWS amplify

## 프로젝트 소개

![사진1](/public/logo/icon-512x512.png)

|                                       |                                       |                                       |                                       |
| :-----------------------------------: | :-----------------------------------: | :-----------------------------------: | :-----------------------------------: |
| ![사진1](/public/readmeImgs/img1.png) | ![사진2](/public/readmeImgs/img2.png) | ![사진3](/public/readmeImgs/img3.png) | ![사진4](/public/readmeImgs/img4.png) |
|                                       |                                       |                                       |                                       |

## 시연 영상

[시연 영상](https://drive.google.com/file/d/19FSOIyqEvzjgoyFruKp1dz69w14tPloH/view?usp=sharing)

## 발표 자료

- https://docs.google.com/presentation/d/10IPyu2nE7j7oc3XjTcGAQLePEowa7Tk_GHCR9C5v6ko/edit?usp=sharing

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
