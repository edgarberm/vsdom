import { ScrewComponent, html, css } from '../../core/index.js'

const style = css`
  :host {
    display: flex;
  }
  [data-component-name] {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const XMLNS = 'http://www.w3.org/2000/svg'
const PATH = './src/icons/icon-'

/**
 * @todo
 * 
 * Cache don's work!
 */
const cache = new Map()

export class IconComponent extends ScrewComponent(HTMLElement) {
  static style = style

  static props = {
    size: 24,
    color: 'var(--grey-1)'
  }

  icon = undefined

  // eslint-disable-next-line no-unused-vars
  // async onConnected() {}
  
  async afterComponentRender() {
    const { icon } = this.props

    // if (cache.has(icon)) {
    //   console.log('Cache')
    //   const svg = cache.get(icon)
    //   this.appendSVG(svg)
    //   return
    // }
    
    const path = await this.fetchSVG(icon)
    const svg = await this.createSVG(path)

    this.appendSVG(svg)
    // cache.set(this.props.icon, svg)
  }

  async fetchSVG(icon) {
    const src = await fetch(`${PATH}${icon}.svg`)
    const text = await src.text()
    const path = document.createRange().createContextualFragment(text).firstElementChild.firstElementChild

    return path
  }

  async createSVG(path) {
    const { color, size } = this.props
    const svg = document.createElementNS(XMLNS, 'svg')

    svg.setAttribute('viewBox', this.getAttribute('viewBox') || '0 0 24 24')
    svg.setAttribute('width', size)
    svg.setAttribute('height', size)
    svg.setAttribute('fill', color)
    svg.setAttribute('class', 'svg-icon')
    svg.appendChild(path)

    return svg
  }

  appendSVG(svg) {
    this.component.appendChild(svg)
  }

  render() {
    return html``
  }
}

customElements.define('icon-component', IconComponent)
