# game of life
## 소개
* 삶(life)이란 세계(world)안에서 이웃(neighborhood)과 더불어 살아가는(resident) 것이다.
* holub on patterns 를 보고 공부한 내용입니다.
  * https://holub.com/software/life/index.html
* 규칙
  * 죽은 세포의 이수 중 정확히 세 개가 살아 있으면 그세포는 살아난다.
  * 살아 있는 세포의 이웃 중에 두 개나 세개가 살아 있으면, 그 세포는 계속 살아 있는 상태를 유지한다.
  * 이외에는 외로워서, 숨이 막혀서 죽어버린다.
## 구조
* composite pattern
  * 부분과 전체 계층을 표현하는 패턴
  * 부분, 전체를 인터페이스로 통일 후 부분을 전체가 포함하는 형태
  ![image](https://user-images.githubusercontent.com/2585673/127866773-05dfd786-c9c6-4249-86d8-605f45285a2a.png)
