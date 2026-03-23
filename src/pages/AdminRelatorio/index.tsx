import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, DollarSign, TrendingUp, Ticket, Users, Download, ChevronDown } from 'lucide-react';
import PageRoutesName from '../../constants/PageRoutesName';
import styles from './style.module.css';

export function AdminRelatorioPage() {
    const navigate = useNavigate();
    const [activePill, setActivePill] = useState('Visão Geral');

    const pills = ['Visão Geral', 'Receita', 'Organizadores', 'Eventos'];

    const receitaPoints = [
        { month: 'Jan', value: 140000, y: 150 },
        { month: 'Fev', value: 160000, y: 128 },
        { month: 'Mar', value: 190000, y: 96 },
        { month: 'Abr', value: 220000, y: 64 },
        { month: 'Mai', value: 185000, y: 101 },
        { month: 'Jun', value: 210000, y: 75 },
        { month: 'Jul', value: 250000, y: 32 },
        { month: 'Ago', value: 240000, y: 42 },
        { month: 'Set', value: 195000, y: 91 },
        { month: 'Out', value: 220000, y: 64 },
        { month: 'Nov', value: 270000, y: 10 },
    ];

    const comissoesPoints = [
        { month: 'Jan', value: 7000, y: 290 },
        { month: 'Fev', value: 8000, y: 288 },
        { month: 'Mar', value: 9500, y: 286 },
        { month: 'Abr', value: 11000, y: 284 },
        { month: 'Mai', value: 9250, y: 287 },
        { month: 'Jun', value: 10500, y: 285 },
        { month: 'Jul', value: 12500, y: 282 },
        { month: 'Ago', value: 12000, y: 283 },
        { month: 'Set', value: 9750, y: 286 },
        { month: 'Out', value: 11000, y: 284 },
        { month: 'Nov', value: 13500, y: 280 },
    ];

    const barPoints = [
        { month: 'Jan', val: 3200 },
        { month: 'Fev', val: 3800 },
        { month: 'Mar', val: 4300 },
        { month: 'Abr', val: 4900, hover: true },
        { month: 'Mai', val: 4000 },
        { month: 'Jun', val: 4700 },
        { month: 'Jul', val: 5500 },
        { month: 'Ago', val: 5200 },
        { month: 'Set', val: 4400 },
        { month: 'Out', val: 5000 },
        { month: 'Nov', val: 6000 },
    ];

    return (
        <div className={styles.container}>
            <button 
                className={styles.backButton}
                onClick={() => navigate(PageRoutesName.administrador.adminDashboard)}
            >
                <ArrowLeft size={16} />
                Voltar ao Dashboard
            </button>

            <div className={styles.headerRow}>
                <div>
                    <h1 className={styles.pageTitle}>Relatórios Globais</h1>
                    <p className={styles.pageSubtitle}>Análises e insights de toda a plataforma</p>
                </div>
                <div className={styles.headerActions}>
                    <div className={styles.dropdown}>
                        Último Ano <ChevronDown size={14} />
                    </div>
                    <button className={styles.exportBtn}>
                        <Download size={16} /> Exportar PDF
                    </button>
                </div>
            </div>

            <div className={styles.pillsRow}>
                {pills.map(p => (
                    <button 
                        key={p} 
                        className={`${styles.pill} ${activePill === p ? styles.activePill : ''}`}
                        onClick={() => setActivePill(p)}
                    >
                        {p}
                    </button>
                ))}
            </div>

            {activePill === 'Visão Geral' && (
                <>
                    <div className={styles.metricsGrid}>
                {/* Receita Total */}
                <div className={styles.metricCard}>
                    <div className={styles.cardHeader}>
                        <span>Receita Total</span>
                        <DollarSign size={18} color="#9ca3af" />
                    </div>
                    <div className={styles.cardValue}>R$ 2.296.000</div>
                    <div className={styles.cardTrendSuccess}>+18.2% vs período anterior</div>
                </div>

                {/* Comissões */}
                <div className={styles.metricCard}>
                    <div className={styles.cardHeader}>
                        <span>Comissões</span>
                        <TrendingUp size={18} color="#9ca3af" />
                    </div>
                    <div className={styles.cardValue}>R$ 114.800</div>
                    <div className={styles.cardTrendSub}>5.0% do total</div>
                </div>

                {/* Ingressos */}
                <div className={styles.metricCard}>
                    <div className={styles.cardHeader}>
                        <span>Ingressos Vendidos</span>
                        <Ticket size={18} color="#9ca3af" />
                    </div>
                    <div className={styles.cardValue}>50.950</div>
                </div>

                {/* Ticket Médio */}
                <div className={styles.metricCard}>
                    <div className={styles.cardHeader}>
                        <span>Ticket Médio</span>
                        <Users size={18} color="#9ca3af" />
                    </div>
                    <div className={styles.cardValue}>R$ 45.06</div>
                </div>
            </div>

            {/* Evolução Line Chart */}
            <div className={styles.chartCard}>
                <div className={styles.chartCardHeader}>
                    <h3 className={styles.chartTitle}>Evolução da Receita e Comissões</h3>
                    <p className={styles.chartSubtitle}>Últimos 11 meses</p>
                </div>
                
                <div className={styles.lineChartArea}>
                    <div className={styles.yAxisLabels}>
                        <span>280000</span>
                        <span>210000</span>
                        <span>140000</span>
                        <span>70000</span>
                        <span>0</span>
                    </div>
                    
                    <div className={styles.svgWrapper}>
                        {/* Grid lines */}
                        <div className={styles.gridLines}>
                            <div className={styles.gridLineH} style={{top: '0%'}}></div>
                            <div className={styles.gridLineH} style={{top: '25%'}}></div>
                            <div className={styles.gridLineH} style={{top: '50%'}}></div>
                            <div className={styles.gridLineH} style={{top: '75%'}}></div>
                            <div className={styles.gridLineH} style={{top: '100%'}}></div>

                            {receitaPoints.map((_, i) => (
                                <div key={i} className={styles.gridLineV} style={{left: `${(i/10)*100}%`}}></div>
                            ))}
                        </div>

                        <svg className={styles.svgChart} viewBox="0 0 1000 300" preserveAspectRatio="none">
                            {/* Receita Line */}
                            <polyline 
                                fill="none" 
                                stroke="#3b82f6" 
                                strokeWidth="3" 
                                points={receitaPoints.map((p, i) => `${(i/10)*1000},${p.y}`).join(' ')} 
                            />
                            {receitaPoints.map((p, i) => (
                                <circle key={`r-${i}`} cx={(i/10)*1000} cy={p.y} r="5" fill="white" stroke="#3b82f6" strokeWidth="2" />
                            ))}

                            {/* Comissoes Line */}
                            <polyline 
                                fill="none" 
                                stroke="#10b981" 
                                strokeWidth="3" 
                                points={comissoesPoints.map((p, i) => `${(i/10)*1000},${p.y}`).join(' ')} 
                            />
                            {comissoesPoints.map((p, i) => (
                                <circle key={`c-${i}`} cx={(i/10)*1000} cy={p.y} r="5" fill="white" stroke="#10b981" strokeWidth="2" />
                            ))}
                        </svg>

                        {/* Hover Tooltip (Mocked statically on Mai as per screenshot) */}
                        <div className={styles.tooltipBox}>
                            <p className={styles.tooltipTitle}>Mai</p>
                            <p className={styles.tooltipRowBlue}>Receita Total : R$ 185.000</p>
                            <p className={styles.tooltipRowGreen}>Comissões : R$ 9.250</p>
                        </div>

                        <div className={styles.xAxisLabels}>
                            {receitaPoints.map((p, i) => (
                                <span key={i} style={{left: `calc(${(i/10)*100}% - 15px)`}}>{p.month}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.chartLegend}>
                    <span className={styles.legendItem}><div className={styles.legendColor} style={{backgroundColor: '#3b82f6'}}></div> Receita Total</span>
                    <span className={styles.legendItem}><div className={styles.legendColor} style={{background: 'transparent', border: '2px solid #10b981', borderRadius: '50%'}}></div> Comissões</span>
                </div>
            </div>

            {/* Categoria Pie Chart */}
            <div className={styles.chartCard}>
                <div className={styles.chartCardHeader}>
                    <h3 className={styles.chartTitle}>Receita por Categoria</h3>
                </div>

                <div className={styles.pieArea}>
                    <div className={styles.pieWrapper}>
                        <div className={styles.pieSlices}></div>
                        
                        {/* Labels positioned around pie */}
                        <div className={styles.pieLabel} style={{top: '-15%', left: '55%', color: '#3b82f6'}}>Música 40%</div>
                        <div className={styles.pieLabel} style={{top: '60%', left: '-25%', color: '#8b5cf6'}}>Teatro 30%</div>
                        <div className={styles.pieLabel} style={{bottom: '-15%', left: '45%', color: '#10b981'}}>Esporte 20%</div>
                        <div className={styles.pieLabel} style={{top: '40%', right: '-35%', color: '#f59e0b'}}>Conferência 10%</div>
                        
                        {/* Tooltip on Musica */}
                        <div className={styles.pieTooltip}>
                            Música : R$ 980.000
                        </div>
                    </div>
                </div>
            </div>

            {/* Bars Chart */}
            <div className={styles.chartCard}>
                <div className={styles.chartCardHeader}>
                    <h3 className={styles.chartTitle}>Ingressos Vendidos por Mês</h3>
                </div>
                
                <div className={styles.barChartArea}>
                    <div className={styles.yAxisLabelsBars}>
                        <span>6000</span>
                        <span>4500</span>
                        <span>3000</span>
                        <span>1500</span>
                        <span>0</span>
                    </div>

                    <div className={styles.barsWrapper}>
                        {/* Grid lines */}
                        <div className={styles.gridLines}>
                            <div className={styles.gridLineH} style={{top: '0%'}}></div>
                            <div className={styles.gridLineH} style={{top: '25%'}}></div>
                            <div className={styles.gridLineH} style={{top: '50%'}}></div>
                            <div className={styles.gridLineH} style={{top: '75%'}}></div>
                            <div className={styles.gridLineH} style={{top: '100%'}}></div>
                        </div>

                        <div className={styles.barsContainer}>
                            {barPoints.map((b, i) => (
                                <div key={i} className={styles.barCol}>
                                    {b.hover && (
                                        <>
                                            <div className={styles.barHoverBg}></div>
                                            <div className={styles.barTooltip}>
                                                <p className={styles.ttTitle}>{b.month}</p>
                                                <p className={styles.ttValue}>Ingressos : {b.val}</p>
                                            </div>
                                        </>
                                    )}
                                    <div className={styles.barFill} style={{height: `${(b.val / 6000) * 100}%`}}></div>
                                    <span className={styles.barMonth}>{b.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )}

    {activePill === 'Receita' && (
                <div className={styles.receitaTabContent}>
                    {/* Double Bar Chart: Receita Mensal */}
                    <div className={styles.chartCard}>
                        <div className={styles.chartCardHeader}>
                            <h3 className={styles.chartTitle}>Receita Mensal Detalhada</h3>
                            <p className={styles.chartSubtitle}>Receita bruta vs comissões da plataforma</p>
                        </div>
                        
                        <div className={styles.barChartAreaWrapper}>
                            <div className={styles.barChartAreaDouble}>
                                <div className={styles.yAxisLabelsDouble}>
                                    <span>280000</span>
                                    <span>210000</span>
                                    <span>140000</span>
                                    <span>70000</span>
                                    <span>0</span>
                                </div>

                                <div className={styles.barsWrapperDouble}>
                                    {/* Grid lines */}
                                    <div className={styles.gridLines}>
                                        <div className={styles.gridLineH} style={{top: '0%'}}></div>
                                        <div className={styles.gridLineH} style={{top: '25%'}}></div>
                                        <div className={styles.gridLineH} style={{top: '50%'}}></div>
                                        <div className={styles.gridLineH} style={{top: '75%'}}></div>
                                        <div className={styles.gridLineH} style={{top: '100%'}}></div>
                                    </div>

                                    <div className={styles.barsContainerDouble}>
                                        {receitaPoints.map((r, i) => {
                                            const c = comissoesPoints[i];
                                            return (
                                                <div key={i} className={styles.barColDouble}>
                                                    <div className={styles.barPair}>
                                                        <div 
                                                            className={styles.barFillBlue} 
                                                            style={{height: `${(r.value / 280000) * 100}%`}}
                                                        ></div>
                                                        <div 
                                                            className={styles.barFillGreen} 
                                                            style={{height: `${(c.value / 280000) * 100}%`}}
                                                        ></div>
                                                    </div>
                                                    <span className={styles.barMonthDouble}>{r.month}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.chartLegendDouble}>
                                <span className={styles.legendItem}><div className={styles.legendColor} style={{backgroundColor: '#3b82f6'}}></div> Receita Total</span>
                                <span className={styles.legendItem}><div className={styles.legendColor} style={{backgroundColor: '#10b981'}}></div> Comissões</span>
                            </div>
                        </div>
                    </div>

                    {/* Metrics Box & Category Bars directly side-by-side or stacked? They seem stacked but very wide. */}
                    <div className={styles.chartCard}>
                        <h3 className={styles.chartTitle} style={{marginBottom: '1.5em'}}>Métricas de Receita</h3>
                        
                        <div className={styles.metricRowBlock}>
                            <p className={styles.metricMinLabel}>Receita Bruta</p>
                            <p className={styles.metricBigValue}>R$ 2.296.000</p>
                        </div>
                        <div className={styles.metricRowBlock}>
                            <p className={styles.metricMinLabel}>Comissões Totais</p>
                            <p className={`${styles.metricBigValue} ${styles.greenText}`}>R$ 114.800</p>
                        </div>
                        <div className={styles.metricRowBlock}>
                            <p className={styles.metricMinLabel}>Receita Organizadores</p>
                            <p className={styles.metricBigValue}>R$ 2.181.200</p>
                        </div>
                        
                        <div className={styles.metricDivider}></div>

                        <div className={styles.metricRowBlock}>
                            <p className={styles.metricMinLabel}>Taxa Média</p>
                            <p className={styles.metricMedValue}>5.00%</p>
                        </div>

                        <button className={styles.exportFullBtn}>
                            <Download size={18} /> Exportar Relatório
                        </button>
                    </div>

                    <div className={styles.chartCard}>
                        <h3 className={styles.chartTitle} style={{marginBottom: '1.5em'}}>Receita por Categoria</h3>

                        <div className={styles.catBarsList}>
                            <div className={styles.catBarItem}>
                                <div className={styles.catBarHeader}>
                                    <span>Música</span>
                                    <span>R$ 980.000</span>
                                </div>
                                <div className={styles.catBarBg}>
                                    <div className={styles.catBarFill} style={{width: '40%', backgroundColor: '#3b82f6'}}></div>
                                </div>
                            </div>
                            <div className={styles.catBarItem}>
                                <div className={styles.catBarHeader}>
                                    <span>Teatro</span>
                                    <span>R$ 735.000</span>
                                </div>
                                <div className={styles.catBarBg}>
                                    <div className={styles.catBarFill} style={{width: '30%', backgroundColor: '#8b5cf6'}}></div>
                                </div>
                            </div>
                            <div className={styles.catBarItem}>
                                <div className={styles.catBarHeader}>
                                    <span>Esporte</span>
                                    <span>R$ 490.000</span>
                                </div>
                                <div className={styles.catBarBg}>
                                    <div className={styles.catBarFill} style={{width: '20%', backgroundColor: '#10b981'}}></div>
                                </div>
                            </div>
                            <div className={styles.catBarItem}>
                                <div className={styles.catBarHeader}>
                                    <span>Conferência</span>
                                    <span>R$ 245.000</span>
                                </div>
                                <div className={styles.catBarBg}>
                                    <div className={styles.catBarFill} style={{width: '10%', backgroundColor: '#f59e0b'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activePill === 'Organizadores' && (
                <div className={styles.orgTabContent}>
                    {/* Table Card */}
                    <div className={styles.chartCard}>
                        <div className={styles.chartCardHeaderOrg}>
                            <div>
                                <h3 className={styles.chartTitle}>Performance dos Organizadores</h3>
                                <p className={styles.chartSubtitle}>Top 5 organizadores por receita</p>
                            </div>
                            <button className={styles.exportBtn}>
                                <Download size={16} /> Exportar
                            </button>
                        </div>
                        
                        <div className={styles.tableWrapper}>
                            <table className={styles.orgTable}>
                                <thead>
                                    <tr>
                                        <th>ORGANIZADOR</th>
                                        <th>EVENTOS</th>
                                        <th>INGRESSOS</th>
                                        <th>RECEITA</th>
                                        <th>COMISSÃO (5%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { id: 1, name: 'Live Nation Brasil', eventos: 45, ingressos: '32.500', receita: 'R$ 1.250.000', comissao: 'R$ 62.500' },
                                        { id: 2, name: 'Rock World', eventos: 28, ingressos: '21.000', receita: 'R$ 850.000', comissao: 'R$ 42.500' },
                                        { id: 3, name: 'Teatro Nacional', eventos: 35, ingressos: '18.500', receita: 'R$ 675.000', comissao: 'R$ 33.750' },
                                        { id: 4, name: 'Sports Events BR', eventos: 22, ingressos: '14.200', receita: 'R$ 540.000', comissao: 'R$ 27.000' },
                                        { id: 5, name: 'Tech Conferences', eventos: 18, ingressos: '9.800', receita: 'R$ 380.000', comissao: 'R$ 19.000' },
                                    ].map(org => (
                                        <tr key={org.id}>
                                            <td className={styles.orgNameCol}>
                                                <div className={styles.orgRank}>{org.id}</div>
                                                <span>{org.name}</span>
                                            </td>
                                            <td>{org.eventos}</td>
                                            <td>{org.ingressos}</td>
                                            <td>{org.receita}</td>
                                            <td className={styles.greenText}>{org.comissao}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Bar Chart Card */}
                    <div className={styles.chartCard}>
                        <h3 className={styles.chartTitle} style={{marginBottom: '2em'}}>Comparativo de Performance</h3>
                        
                        <div className={styles.orgChartArea}>
                            <div className={styles.yAxisLabelsOrg}>
                                <span>34000</span>
                                <span>25500</span>
                                <span>17000</span>
                                <span>8500</span>
                                <span>0</span>
                            </div>

                            <div className={styles.barsWrapperOrg}>
                                <div className={styles.gridLines}>
                                    <div className={styles.gridLineH} style={{top: '0%'}}></div>
                                    <div className={styles.gridLineH} style={{top: '25%'}}></div>
                                    <div className={styles.gridLineH} style={{top: '50%'}}></div>
                                    <div className={styles.gridLineH} style={{top: '75%'}}></div>
                                    <div className={styles.gridLineH} style={{top: '100%'}}></div>
                                </div>

                                <div className={styles.barsContainerOrg}>
                                    {[
                                        { name: 'Live Nation Brasil', eventos: 45, ingressosVal: 32500 },
                                        { name: 'Rock World', eventos: 28, ingressosVal: 21000 },
                                        { name: 'Teatro Nacional', eventos: 35, ingressosVal: 18500 },
                                        { name: 'Sports Events BR', eventos: 22, ingressosVal: 14200 },
                                        { name: 'Tech Conferences', eventos: 18, ingressosVal: 9800 },
                                    ].map((b, i) => (
                                        <div key={i} className={styles.barColOrg}>
                                            <div className={styles.barPairOrg}>
                                                <div 
                                                    className={styles.barFillBlue} 
                                                    style={{height: `${Math.max((b.eventos / 34000) * 100, 1)}%`}}
                                                ></div>
                                                <div 
                                                    className={styles.barFillGreenOrg} 
                                                    style={{height: `${(b.ingressosVal / 34000) * 100}%`}}
                                                ></div>
                                            </div>
                                            <span className={styles.barLabelOrg}>{b.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={styles.chartLegendDouble}>
                            <span className={styles.legendItem}><div className={styles.legendColor} style={{backgroundColor: '#3b82f6'}}></div> Eventos</span>
                            <span className={styles.legendItem}><div className={styles.legendColor} style={{backgroundColor: '#10b981'}}></div> Ingressos (÷100)</span>
                        </div>
                    </div>
                </div>
            )}

            {activePill === 'Eventos' && (
                <div className={styles.evtTabContent}>
                    {/* Top Eventos Table */}
                    <div className={styles.chartCard}>
                        <div className={styles.chartCardHeaderOrg}>
                            <div>
                                <h3 className={styles.chartTitle}>Top Eventos por Receita</h3>
                                <p className={styles.chartSubtitle}>Eventos com maior faturamento</p>
                            </div>
                            <button className={styles.exportBtn}>
                                <Download size={16} /> Exportar
                            </button>
                        </div>
                        
                        <div className={styles.tableWrapper}>
                            <table className={styles.orgTable}>
                                <thead>
                                    <tr>
                                        <th>EVENTO</th>
                                        <th>ORGANIZADOR</th>
                                        <th>INGRESSOS</th>
                                        <th>RECEITA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { id: 1, name: 'Rock in Rio 2025', org: 'Live Nation Brasil', ingressos: '85.000', receita: 'R$ 38.250.000' },
                                        { id: 2, name: 'Festival Eletrônica SP', org: 'Rock World', ingressos: '45.000', receita: 'R$ 6.750.000' },
                                        { id: 3, name: 'Jogos Pan-Americanos', org: 'Sports Events BR', ingressos: '120.000', receita: 'R$ 12.000.000' },
                                        { id: 4, name: 'Tech Summit 2025', org: 'Tech Conferences', ingressos: '5.000', receita: 'R$ 1.750.000' },
                                        { id: 5, name: 'Musical da Broadway', org: 'Teatro Nacional', ingressos: '15.000', receita: 'R$ 3.000.000' },
                                    ].map(evt => (
                                        <tr key={evt.id}>
                                            <td className={styles.orgNameCol}>
                                                <div className={styles.evtRank}>{evt.id}</div>
                                                <span>{evt.name}</span>
                                            </td>
                                            <td>{evt.org}</td>
                                            <td>{evt.ingressos}</td>
                                            <td>{evt.receita}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Eventos por Categoria */}
                    <div className={styles.chartCard}>
                        <h3 className={styles.chartTitle} style={{marginBottom: '1.5em'}}>Eventos por Categoria</h3>
                        <div className={styles.evtCatList}>
                            <div className={`${styles.evtCatItem} ${styles.blueTheme}`}>
                                <div className={styles.evtCatLeft}>
                                    <span>🎵 Música</span>
                                </div>
                                <span className={styles.evtCatCount}>89 eventos</span>
                            </div>
                            <div className={`${styles.evtCatItem} ${styles.purpleTheme}`}>
                                <div className={styles.evtCatLeft}>
                                    <span>🎭 Teatro</span>
                                </div>
                                <span className={styles.evtCatCount}>64 eventos</span>
                            </div>
                            <div className={`${styles.evtCatItem} ${styles.greenTheme}`}>
                                <div className={styles.evtCatLeft}>
                                    <span>⚽ Esporte</span>
                                </div>
                                <span className={styles.evtCatCount}>45 eventos</span>
                            </div>
                            <div className={`${styles.evtCatItem} ${styles.orangeTheme}`}>
                                <div className={styles.evtCatLeft}>
                                    <span>💼 Conferência</span>
                                </div>
                                <span className={styles.evtCatCount}>36 eventos</span>
                            </div>
                        </div>
                    </div>

                    {/* Taxa de Ocupação Média */}
                    <div className={styles.chartCard}>
                        <h3 className={styles.chartTitle} style={{marginBottom: '1.5em'}}>Taxa de Ocupação Média</h3>
                        <div className={styles.catBarsList}>
                            <div className={styles.catBarItem}>
                                <div className={styles.catBarHeader}>
                                    <span>Música</span>
                                    <span>78%</span>
                                </div>
                                <div className={styles.catBarBg}>
                                    <div className={styles.catBarFill} style={{width: '78%', backgroundColor: '#3b82f6'}}></div>
                                </div>
                            </div>
                            <div className={styles.catBarItem}>
                                <div className={styles.catBarHeader}>
                                    <span>Teatro</span>
                                    <span>85%</span>
                                </div>
                                <div className={styles.catBarBg}>
                                    <div className={styles.catBarFill} style={{width: '85%', backgroundColor: '#8b5cf6'}}></div>
                                </div>
                            </div>
                            <div className={styles.catBarItem}>
                                <div className={styles.catBarHeader}>
                                    <span>Esporte</span>
                                    <span>92%</span>
                                </div>
                                <div className={styles.catBarBg}>
                                    <div className={styles.catBarFill} style={{width: '92%', backgroundColor: '#10b981'}}></div>
                                </div>
                            </div>
                            <div className={styles.catBarItem}>
                                <div className={styles.catBarHeader}>
                                    <span>Conferência</span>
                                    <span>68%</span>
                                </div>
                                <div className={styles.catBarBg}>
                                    <div className={styles.catBarFill} style={{width: '68%', backgroundColor: '#f59e0b'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
