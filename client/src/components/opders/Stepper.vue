<template>
    <div class="stepper stepper--flexbox">
        <input disabled class="stepper__input" id="stepper-flex-0" name="stepper-flex" type="radio" checked="checked"/>
        <div class="stepper__step">
            <label class="stepper__button" for="stepper-flex-0">chocolate</label>
        </div>
        <input disabled class="stepper__input" id="stepper-flex-1" name="stepper-flex" :checked="step >= 2"
               type="radio"/>
        <div class="stepper__step">
            <label class="stepper__button" for="stepper-flex-1">vanilla</label>
        </div>
        <input disabled class="stepper__input" id="stepper-flex-2" name="stepper-flex" :checked="step >= 3" type="radio"/>
        <div class="stepper__step">
            <label class="stepper__button" for="stepper-flex-2">strawberry</label>
        </div>
    </div>

</template>

<script>
export default {
    name: "Stepper",
    props: {
        step: {
            type: Number
        }
    }
}
</script>

<style lang="scss">
:root {
    --s-width: 900px;
    --s-gutter: 2.5rem;
    --c-background: rgb(0, 0, 0);
    --c-accent: hsl(213, 74%, 58%);
}

///////
// STEPPER CSS
///////

.stepper {
    padding: 10px 5px;
    $root: &;
    --s-stepper-bullet: 2rem;
    --s-stepper-bullet-half: calc(var(--s-stepper-bullet) / 2);
    --step-transition: background .5s, color .5s;
    // all colors are define for the active state
    --step-content: '✔︎';
    --step-color: hsl(0, 0%, 70%);
    --step-bar-bg: var(--c-accent);
    --step-bullet-bg: var(--step-bar-bg);
    --step-bullet-color: white;
    counter-reset: current-step;
    // Use grid here
    // • we can support a multiline stepper by increasing the minmax min level
    // • grid is more strict at respecting column than flexbox: a very small width, the contents will overlap
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(1px, 1fr) );
    position: relative;
    z-index: 1;

    &[data-debug] {
        counter-reset: steps;

        &::after {
            content: "number of steps: " counter(steps);
            display: block;
            position: absolute;
            bottom: -1.5rem;
            width: 100%;
            text-align: center;
            color: hsl(40, 50%, 50%);
        }

        input {
            --s-separation: 1.5rem;
            position: absolute;
            display: initial;
            top: -2rem;
            @for $i from 1 through 10 {
                &:nth-of-type(#{$i}) {
                    left: calc(var(--s-separation) * #{$i} + .75rem);
                }
            }
        }
    }

    // don't know
    &__input {
        counter-increment: steps;
        display: none;
    }

    &__step {
        counter-increment: current-step;

        // everything beyond the current step is deactivated
        #{$root}__input:checked ~ & {
            --step-color: hsl(0, 0%, 30%);
            --step-bar-bg: hsl(0, 0%, 40%);
            --step-bullet-bg: var(--step-bar-bg);
            --step-bullet-color: hsl(0, 0%, 20%);
            --step-content: counter(current-step);

            // we can also use “display: none”
            // • but we take an opacity approach to keep the height of the stepper coherent with the bigger step
            #{$root}__content {
                opacity: 0;
                pointer-events: none;
                user-select: none;
            }
        }

        // This is the current step
        // • restore active colors & content
        #{$root}__input:checked + & {
            --step-bullet-bg: hsl(213, 70%, 50%);
            --step-bullet-color: white;
            --step-color: white;

            #{$root}__button {
                &::before {
                    box-shadow: 0 0 0 2px hsla(0, 0%, 70%, 1);
                }
            }

            #{$root}__content {
                opacity: 1;
                pointer-events: auto;
                user-select: auto;
            }
        }
    }

    &__content {
        color: white;
        text-align: center;
        font-style: italic;
        font-weight: 300;
        color: var(--step-color);
        transition: opacity .5s .05s;
        padding: .5rem;

        &::selection {
            color: black;
            background: var(--step-bullet-color);
        }
    }

    &__button {
        position: relative;
        text-align: center;
        color: var(--step-color);
        display: block;

        // bullet
        &::before {
            content: var(--step-content);
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto var(--s-stepper-bullet-half);
            height: var(--s-stepper-bullet);
            width: var(--s-stepper-bullet);
            border-radius: var(--s-stepper-bullet);
            transition: var(--step-transition);
            background: var(--step-bullet-bg);
            color: var(--step-bullet-color);
        }

        // progress bar
        &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: calc(var(--s-stepper-bullet-half) / 2);
            background: var(--step-bar-bg);
            transition: var(--step-transition);
            top: var(--s-stepper-bullet-half);
            left: 50%;
            transform: translate(0, -50%);
            z-index: -1;

            // connecting lines are always steps.length - 1
            #{$root}__step:last-child & {
                display: none;
            }
        }
    }

    // we can also use CSS flexbox.
    // • but when not enough space
    //   columns won't be  respected anymore
    &--flexbox {
        display: flex;

        #{$root}__step {
            flex-grow: 1;
            flex-shrink: 0;
            flex-basis: 0;
        }
    }
}

///////
// DEMO UTILS
///////

body {
    font-family: sans-serif;
    margin: 0;
    padding: 0;
    background: var(--c-background);
    grid-area: content;
}

article {
    padding: var(--s-gutter) calc(50% - var(--s-width) / 2);
    background: hsl(0, 0%, 7%);
    color: hsl(0, 0%, 80%);

    h1 {
        font-weight: 100;
        font-size: 2rem;
        padding: 0 var(--s-gutter);
        margin: 0;
    }

    ul,
    li {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    li {
        padding-left: 1rem;
        text-indent: -.7rem;
        padding-top: .5rem;

        &::before {
            content: "• ";
            color: var(--c-accent);
        }
    }

    ul,
    p {
        padding: calc(var(--s-gutter) / 2) var(--s-gutter) 0;
    }
}

.container {
    &,
    &__item {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    &__item {
        padding: var(--s-gutter) calc(50% - var(--s-width) / 2);
        border-bottom: 2px solid rgba(255, 255, 255, .15);

        h2 {
            padding: calc(var(--s-gutter) / 2) var(--s-gutter) var(--s-gutter);
            margin: 0;
            text-transform: uppercase;
            font-weight: 100;
            color: hsl(213, 15%, 60%);
            font-size: 1.4rem;
        }
    }
}
</style>