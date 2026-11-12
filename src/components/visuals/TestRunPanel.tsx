import { useRef, useState } from 'react'
import type { JSX, KeyboardEvent } from 'react'
import { Badge } from '../ui/Badge'
import { Icon } from '../ui/Icon'
import styles from './TestRunPanel.module.css'

type TabId = 'manual' | 'api' | 'pytest'

interface TabDefinition {
  id: TabId
  label: string
  file: string
  passStat: string
  failStat: string
  progress: number
}

const tabs: TabDefinition[] = [
  {
    id: 'manual',
    label: 'Manual',
    file: 'checkout-checklist.md',
    passStat: '2 passed',
    failStat: '1 finding',
    progress: 67,
  },
  {
    id: 'api',
    label: 'API',
    file: 'orders.http',
    passStat: '1 response',
    failStat: '1 finding',
    progress: 50,
  },
  {
    id: 'pytest',
    label: 'Pytest',
    file: 'test_checkout.py',
    passStat: '10 passed',
    failStat: '1 failed',
    progress: 91,
  },
]

function ManualPanel() {
  return (
    <div className={styles.panelContent}>
      <ul className={styles.checkList}>
        <li className={styles.checkRow}>
          <span className={`${styles.statusIcon} ${styles.pass}`}>
            <Icon name="check" size={11} strokeWidth={2.4} />
          </span>
          <div>
            <p className={styles.rowTitle}>Промокод пересчитывает итог</p>
            <p className={styles.rowMeta}>checkout / promo-code</p>
          </div>
          <span className={styles.passText}>PASS</span>
        </li>
        <li className={styles.checkRow}>
          <span className={`${styles.statusIcon} ${styles.pass}`}>
            <Icon name="check" size={11} strokeWidth={2.4} />
          </span>
          <div>
            <p className={styles.rowTitle}>Пустая корзина не оформляется</p>
            <p className={styles.rowMeta}>checkout / empty-cart</p>
          </div>
          <span className={styles.passText}>PASS</span>
        </li>
        <li className={styles.checkRow}>
          <span className={`${styles.statusIcon} ${styles.fail}`}>
            <Icon name="close" size={11} strokeWidth={2.4} />
          </span>
          <div>
            <p className={styles.rowTitle}>Удаление последнего товара</p>
            <p className={styles.rowMeta}>cart / recalculate-total</p>
          </div>
          <span className={styles.failText}>BUG</span>
        </li>
      </ul>

      <div className={styles.note}>
        <span className={styles.noteLabel}>Найдено</span>
        <p>Итоговая сумма остаётся прежней после удаления последнего товара.</p>
      </div>
    </div>
  )
}

function ApiPanel() {
  return (
    <div className={styles.panelContent}>
      <div className={styles.requestLine}>
        <span className={styles.method}>POST</span>
        <code className={styles.url}>/api/v1/orders</code>
      </div>

      <pre className={styles.codeBlock}>
        <code>{`{
  "items": [{ "sku": "QA-01", "qty": 1 }],
  "promo": "SUMMER20"
}`}</code>
      </pre>

      <div className={styles.response}>
        <div className={styles.responseHead}>
          <span className={styles.httpStatus}>422</span>
          <span>Unprocessable Entity</span>
          <span className={styles.responseTime}>184 ms</span>
        </div>
        <p className={styles.errorCode}>"code": "promo_not_applicable"</p>
        <p className={styles.responseText}>
          Ожидалось понятное сообщение рядом с полем промокода, а не общая
          ошибка формы.
        </p>
      </div>
    </div>
  )
}

function PytestPanel() {
  return (
    <div className={`${styles.panelContent} ${styles.terminal}`}>
      <p className={styles.command}>
        <span className={styles.prompt}>$</span> pytest tests/ -q
      </p>
      <ul className={styles.testList}>
        <li className={styles.testRow}>
          <span className={styles.passText}>PASS</span>
          <span className={styles.testName}>test_login_valid</span>
          <span className={styles.testTime}>0.12s</span>
        </li>
        <li className={styles.testRow}>
          <span className={styles.passText}>PASS</span>
          <span className={styles.testName}>test_cart_total</span>
          <span className={styles.testTime}>0.18s</span>
        </li>
        <li className={styles.testRow}>
          <span className={styles.failText}>FAIL</span>
          <span className={styles.testName}>test_total_with_discount</span>
          <span className={styles.testTime}>0.31s</span>
        </li>
      </ul>

      <div className={styles.assertion}>
        <span className={styles.assertLabel}>assert</span>
        <code>990 == 891</code>
      </div>

      <p className={styles.pySummary}>
        <span className={styles.failText}>1 failed</span>
        <span aria-hidden="true">, </span>
        <span className={styles.passText}>10 passed</span>
        <span className={styles.summaryTime}>in 0.84s</span>
      </p>
    </div>
  )
}

const panels: Record<TabId, () => JSX.Element> = {
  manual: ManualPanel,
  api: ApiPanel,
  pytest: PytestPanel,
}

export function TestRunPanel() {
  const [activeTab, setActiveTab] = useState<TabId>('manual')
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeDefinition = tabs.find((tab) => tab.id === activeTab) ?? tabs[0]

  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
    let nextIndex = currentIndex

    if (event.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % tabs.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1
    } else {
      return
    }

    event.preventDefault()
    const nextTab = tabs[nextIndex]
    if (!nextTab) return
    setActiveTab(nextTab.id)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <div className={styles.panelShell}>
      <div
        aria-label="Демонстрационный отчёт тестирования"
        className={styles.panel}
      >
        <div className={styles.topbar}>
          <div aria-hidden="true" className={styles.dots}>
            <span />
            <span />
            <span className={styles.activeDot} />
          </div>
          <span className={styles.file}>
            <Icon name="terminal" size={13} />
            {activeDefinition?.file}
          </span>
          <Badge className={styles.demoBadge} tone="outline">
            Demo
          </Badge>
        </div>

        <div
          aria-label="Тип проверки"
          className={styles.tabs}
          onKeyDown={handleTabKeyDown}
          role="tablist"
        >
          {tabs.map((tab, index) => (
            <button
              aria-controls={`test-panel-${tab.id}`}
              aria-selected={activeTab === tab.id}
              className={styles.tab}
              id={`test-tab-${tab.id}`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              ref={(node) => {
                tabRefs.current[index] = node
              }}
              role="tab"
              tabIndex={activeTab === tab.id ? 0 : -1}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.body}>
          {tabs.map((tab) => {
            const Panel = panels[tab.id]
            return (
              <div
                aria-labelledby={`test-tab-${tab.id}`}
                hidden={activeTab !== tab.id}
                id={`test-panel-${tab.id}`}
                key={tab.id}
                role="tabpanel"
                tabIndex={0}
              >
                <Panel />
              </div>
            )
          })}
        </div>

        <div className={styles.runFooter}>
          <div
            aria-label={`Прогресс: ${activeDefinition?.progress ?? 0}%`}
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={activeDefinition?.progress ?? 0}
            className={styles.progress}
            role="progressbar"
          >
            <span
              className={styles.progressBar}
              style={{ width: `${activeDefinition?.progress ?? 0}%` }}
            />
          </div>
          <div className={styles.footerStats}>
            <span>{activeDefinition?.passStat}</span>
            <span className={styles.footerFail}>
              {activeDefinition?.failStat}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
