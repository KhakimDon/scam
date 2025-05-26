<template>
  <li
      :class=" $attrs.class"
      aria-hidden="true"
      role="presentation"
  >
    <slot>
      <i class="icon-chevron block !rotate-180 text-xl"/>
    </slot>
  </li>
</template>
