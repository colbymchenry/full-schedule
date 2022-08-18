
<script lang="ts" type="module">

    import IconClose from '$lib/svgs/icon-close.svelte';

    const banners = [
        '/images/14-640x480.jpg',
        '/images/15-640x480.jpg',
        '/images/19-640x480.jpg',
        '/images/22-640x480.jpg',
        '/images/23-640x480.jpg',
        '/images/24-640x480.jpg',
        '/images/29-640x480.jpg',
        '/images/32-640x480.jpg',
        '/images/33-640x480.jpg',
        '/images/34-640x480.jpg'
    ];

</script>

<div class="drawer">
    <div class="drawer__container">
        <div id="drawer-header" class="drawer__header w-node-_16246c70-24c8-286d-ac1f-98e34affc3de-630e5788">
            <img src={banners[0]} loading="lazy"
                 srcset={`${banners[0]} 500w, ${banners[0]} 640w`} sizes="100vw" alt=""
                 class="header__img is--visible">
            <div data-w-id="3bac95bc-19b5-2ec4-1b52-c814e66cc721" class="top-bar__icon header__close w-embed">
                <IconClose />
            </div>
            <img src="/images/brian-hughes.jpg" loading="lazy" alt="" class="header__avatar">
        </div>
        <div id="w-node-_60ed2060-03e1-dcaa-0509-3c3a0011fb19-630e5788" class="drawer__body">
            <div class="body__edit-btn">
                <a data-w-id="7241f703-d5af-9275-3142-df69bde86c9e" href="#"
                   class="primary-button drawer__edit-btn is--clear w-button">Edit</a>
                <div class="html-embed w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 20 20" fill="currentColor" fit=""
                         height="100%" width="100%" preserveaspectratio="xMidYMid meet" focusable="false">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                        <path fill-rule="evenodd"
                              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                              clip-rule="evenodd"></path>
                    </svg>
                </div>
            </div>
            <h1 class="client__name">Barber Johnson</h1>
            <div class="hr"></div>
            <div class="client__detail">
                <div class="detail__icon w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="currentColor">
                        <path d="M7.1 40.3q-1.35 0-2.375-1.025T3.7 36.9V11.1q0-1.4 1.025-2.4t2.375-1h33.8q1.4 0 2.4 1t1 2.4v25.8q0 1.35-1 2.375T40.9 40.3Zm16.9-15L7.1 14.15V36.9h33.8V14.15Zm0-3.3 16.7-10.9H7.35ZM7.1 14.15V11.1v25.8Z"></path>
                    </svg>
                </div>
                <a href="#" class="detail__text">barberjohnson@mail.org</a>
            </div>
            <div class="client__detail">
                <div class="detail__icon w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="currentColor">
                        <path d="M19.9 41.6h8.2v-2h-8.2Zm-6.75 4.7q-1.4 0-2.425-1.025T9.7 42.85V5.15q0-1.4 1.025-2.425T13.15 1.7h21.7q1.4 0 2.425 1.025T38.3 5.15v37.7q0 1.4-1.025 2.425T34.85 46.3Zm0-7.95v4.5h21.7v-4.5Zm0-3h21.7V9.65h-21.7Zm0-28.7h21.7v-1.5h-21.7Zm0 31.7v4.5Zm0-31.7v-1.5 1.5Z"></path>
                    </svg>
                </div>
                <a href="#" class="detail__text is--ibm-font">470 495 5859</a>
            </div>
            <div class="client__detail-location">
                <div class="client__detail">
                    <div class="detail__icon w-embed">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="currentColor">
                            <path d="M24 32.6q5.1-4.1 7.7-7.925 2.6-3.825 2.6-7.075 0-2.9-1.05-4.9-1.05-2-2.6-3.275t-3.35-1.85Q25.5 7 24 7q-1.5 0-3.3.575-1.8.575-3.35 1.85-1.55 1.275-2.6 3.275t-1.05 4.9q0 3.25 2.6 7.075T24 32.6Zm0 4.35q-6.95-5.25-10.325-10Q10.3 22.2 10.3 17.6q0-3.45 1.25-6.075t3.225-4.4q1.975-1.775 4.4-2.65Q21.6 3.6 24 3.6q2.4 0 4.825.875 2.425.875 4.4 2.65 1.975 1.775 3.225 4.4Q37.7 14.15 37.7 17.6q0 4.6-3.375 9.35T24 36.95ZM24 21q1.55 0 2.625-1.1t1.075-2.6q0-1.55-1.075-2.625T24 13.6q-1.5 0-2.6 1.075T20.3 17.3q0 1.5 1.1 2.6T24 21ZM10.3 44.4V41h27.4v3.4ZM24 17.6Z"></path>
                        </svg>
                    </div>
                    <a href="#" class="detail__text">6400 Blue Stone Rd, Atlanta, GA 30326</a>
                </div>
                <div class="location__buttons">
                    <a href="#" class="location__button is--waze w-inline-block"></a>
                    <a href="#" class="location__button is--google w-inline-block"></a>
                    <a href="#" class="location__button is--google is--apple w-inline-block"></a>
                </div>
            </div>
            <div class="client__detail">
                <div class="detail__icon w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="currentColor">
                        <path d="M7.85 44.3q-1 0-1.7-.725t-.7-1.725v-10.5q0-1.3.85-2.275Q7.15 28.1 8.45 28H9.8v-8.75q0-1.45.975-2.45.975-1 2.425-1h9.1v-3q-1-.7-1.525-1.55-.525-.85-.525-2.05 0-.8.275-1.5t.825-1.25L24 3.65l2.65 2.8q.55.55.85 1.25.3.7.3 1.5 0 1.2-.55 2.05-.55.85-1.55 1.55v3h9.1q1.4 0 2.4 1t1 2.45V28h1.35q1.3.1 2.15 1.075.85.975.85 2.275v10.5q0 1-.7 1.725-.7.725-1.7.725Zm5.35-16.4h21.6v-8.65H13.2ZM8.85 40.85h30.3v-9.5H8.85ZM13.2 27.9h21.6ZM8.85 40.85h30.3Zm30.7-12.95H8.45h31.1Z"></path>
                    </svg>
                </div>
                <div class="detail__text">March 2, 1067</div>
            </div>
            <div class="client__detail is--aligned-top">
                <div class="detail__icon is-flipped w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="currentColor">
                        <path d="M9.1 42.35q-1.45 0-2.425-.975Q5.7 40.4 5.7 38.9V9.15q0-1.5.975-2.475Q7.65 5.7 9.1 5.7h9.75q.4-1.75 1.85-2.875Q22.15 1.7 24 1.7q1.85 0 3.275 1.125Q28.7 3.95 29.15 5.7h9.75q1.45 0 2.425.975.975.975.975 2.475V38.9q0 1.5-.975 2.475-.975.975-2.425.975Zm0-3.45h29.8V9.15h-2.95v4.65h-23.9V9.15H9.1V38.9ZM24 9q.85 0 1.425-.575Q26 7.85 26 7q0-.85-.575-1.425Q24.85 5 24 5q-.85 0-1.425.575Q22 6.15 22 7q0 .85.575 1.425Q23.15 9 24 9Z"></path>
                    </svg>
                </div>
                <div class="detail__text client__notes">Esse amet ex duis esse aliqua non tempor ullamco dolore
                    et aliquip nisi pariatur qui laborum id consequat tempor sint eiusmod exercitation velit
                    aliquip occaecat tempor nisi aute magna sint.Deserunt veniam voluptate dolore eiusmod eu
                    consequat dolor sit pariatur laboris anim excepteur consequat nulla officia exercitation
                    magna sint ea excepteur qui eu officia pariatur culpa sint elit nulla officia.
                </div>
            </div>
            <div class="textline is--drawer">
                <div class="textline__container is--drawer">
                    <div class="textline__text is--drawer">Appointments</div>
                </div>
            </div>
            <div class="drawer__apps">
                <div data-hover="false" data-delay="0" data-w-id="2ec2f701-85f9-94a8-f9c9-7384a62c472c"
                     style="height:56px" class="accordion drawer__app is--upcoming w-dropdown">
                    <div class="accordion__toggle w-dropdown-toggle">
                        <div class="accordion__icon is--upcoming w-icon-dropdown-toggle"></div>
                        <div class="app__bar">
                            <div class="client__detail is--smaller">
                                <div class="detail__icon is--upcoming w-embed">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"
                                         fill="currentColor">
                                        <path d="m19.1 37.15-2.25-2.25L21.8 30l-4.95-4.9 2.25-2.25L24 27.8l4.9-4.95 2.25 2.25L26.2 30l4.95 4.9-2.25 2.25L24 32.2Zm-10 7.15q-1.35 0-2.375-1.025T5.7 40.9V10.1q0-1.4 1.025-2.4t2.375-1h3.15v-3h3.45v3h16.6v-3h3.45v3h3.15q1.4 0 2.4 1t1 2.4v30.8q0 1.35-1 2.375T38.9 44.3Zm0-3.4h29.8V19.5H9.1v21.4Zm0-24.4h29.8v-6.4H9.1Zm0 0v-6.4 6.4Z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="client__detail">
                                <div class="detail__icon is--upcoming w-embed">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"
                                         fill="currentColor">
                                        <path d="M24 23.8q-3.45 0-5.625-2.175T16.2 16q0-3.45 2.175-5.625T24 8.2q3.45 0 5.625 2.175T31.8 16q0 3.45-2.175 5.625T24 23.8ZM7.7 40.45v-5q0-2 1-3.425 1-1.425 2.55-2.175 3.4-1.5 6.5-2.25t6.25-.75q3.15 0 6.225.775Q33.3 28.4 36.7 29.9q1.6.7 2.6 2.125t1 3.425v5Zm3.4-3.4h25.8V35.5q0-.8-.475-1.525-.475-.725-1.175-1.075-3.15-1.5-5.775-2.075Q26.85 30.25 24 30.25q-2.85 0-5.525.575Q15.8 31.4 12.7 32.9q-.7.35-1.15 1.075-.45.725-.45 1.525ZM24 20.4q1.9 0 3.15-1.25T28.4 16q0-1.9-1.25-3.15T24 11.6q-1.9 0-3.15 1.25T19.6 16q0 1.9 1.25 3.15T24 20.4Zm0-4.4Zm0 21.05Z"></path>
                                    </svg>
                                </div>
                                <div class="detail__text is--upcoming">Bethany Struckmeyer</div>
                            </div>
                            <div class="client__detail">
                                <div class="detail__icon is--upcoming w-embed">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"
                                         fill="currentColor">
                                        <path d="M29.85 37q-2.05 0-3.45-1.4-1.4-1.4-1.4-3.45 0-2.05 1.4-3.45 1.4-1.4 3.45-1.4 2.05 0 3.45 1.4 1.4 1.4 1.4 3.45 0 2.05-1.4 3.45-1.4 1.4-3.45 1.4ZM9.1 44.3q-1.35 0-2.375-1.025T5.7 40.9V10.1q0-1.4 1.025-2.4t2.375-1h3.15v-3h3.45v3h16.6v-3h3.45v3h3.15q1.4 0 2.4 1t1 2.4v30.8q0 1.35-1 2.375T38.9 44.3Zm0-3.4h29.8V19.5H9.1v21.4Zm0-24.4h29.8v-6.4H9.1Zm0 0v-6.4 6.4Z"></path>
                                    </svg>
                                </div>
                                <div class="detail__text is--upcoming">March 6, 2022</div>
                            </div>
                        </div>
                    </div>
                    <nav class="accordion__dropdown is--upcoming w-dropdown-list">
                        <div class="app__info is--upcoming">
                            <div class="client__detail is--shrunk">
                                <div class="detail__icon is--upcoming w-embed">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"
                                         fill="currentColor">
                                        <path d="m31.2 33.7 2.45-2.45-7.85-7.9V13.4h-3.3v11.25ZM24 44.3q-4.15 0-7.875-1.6-3.725-1.6-6.475-4.35Q6.9 35.6 5.3 31.875 3.7 28.15 3.7 24t1.6-7.875Q6.9 12.4 9.65 9.65 12.4 6.9 16.125 5.3 19.85 3.7 24 3.7t7.875 1.6Q35.6 6.9 38.35 9.65q2.75 2.75 4.35 6.475Q44.3 19.85 44.3 24t-1.6 7.875q-1.6 3.725-4.35 6.475-2.75 2.75-6.45 4.35-3.7 1.6-7.9 1.6ZM24 24Zm0 16.9q6.95 0 11.925-4.95Q40.9 31 40.9 24q0-6.95-4.975-11.925Q30.95 7.1 24 7.1q-6.95 0-11.925 4.975Q7.1 17.05 7.1 24q0 7 4.975 11.95Q17.05 40.9 24 40.9Z"></path>
                                    </svg>
                                </div>
                                <div class="detail__text">3:45 pm</div>
                            </div>
                            <div class="client__detail is--aligned-top is--top-adjusted is--shrunk">
                                <div class="detail__icon is--upcoming w-embed">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"
                                         fill="currentColor">
                                        <path d="M9.1 42.35q-1.4 0-2.4-1t-1-2.45V9.15q0-1.4 1-2.425T9.1 5.7h9.95q.35-1.75 1.725-2.875T24 1.7q1.85 0 3.225 1.125T28.95 5.7h9.95q1.4 0 2.4 1.025t1 2.425V38.9q0 1.45-1 2.45-1 1-2.4 1Zm0-3.45h29.8V9.15H9.1V38.9Zm5-5h13.55v-3H14.1Zm0-8.4h19.8v-3H14.1Zm0-8.35h19.8v-3H14.1Zm9.9-8.9q.75 0 1.275-.55.525-.55.525-1.25 0-.75-.525-1.3T24 4.6q-.75 0-1.275.55-.525.55-.525 1.25 0 .75.525 1.3T24 8.25ZM9.1 38.9V9.15 38.9Z"></path>
                                    </svg>
                                </div>
                                <div class="client__detail-services is--top-adjusted">
                                    <div>Hydrafacial</div>
                                    <div>Botox</div>
                                    <div>BAM Signature Facial</div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                <div data-hover="false" data-delay="0" data-w-id="d14d591a-c13e-482d-0b95-4cb687976dcc"
                     style="height:56px" class="accordion drawer__app is-cancelled w-dropdown">
                    <div class="accordion__toggle w-dropdown-toggle">
                        <div class="accordion__icon is--cancelled w-icon-dropdown-toggle"></div>
                        <div class="app__bar">
                            <div class="client__detail is--smaller">
                                <div class="detail__icon is--cancelled w-embed">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"
                                         fill="currentColor">
                                        <path d="m19.1 37.15-2.25-2.25L21.8 30l-4.95-4.9 2.25-2.25L24 27.8l4.9-4.95 2.25 2.25L26.2 30l4.95 4.9-2.25 2.25L24 32.2Zm-10 7.15q-1.35 0-2.375-1.025T5.7 40.9V10.1q0-1.4 1.025-2.4t2.375-1h3.15v-3h3.45v3h16.6v-3h3.45v3h3.15q1.4 0 2.4 1t1 2.4v30.8q0 1.35-1 2.375T38.9 44.3Zm0-3.4h29.8V19.5H9.1v21.4Zm0-24.4h29.8v-6.4H9.1Zm0 0v-6.4 6.4Z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="client__detail">
                                <div class="detail__icon is--cancelled w-embed">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"
                                         fill="currentColor">
                                        <path d="M24 23.8q-3.45 0-5.625-2.175T16.2 16q0-3.45 2.175-5.625T24 8.2q3.45 0 5.625 2.175T31.8 16q0 3.45-2.175 5.625T24 23.8ZM7.7 40.45v-5q0-2 1-3.425 1-1.425 2.55-2.175 3.4-1.5 6.5-2.25t6.25-.75q3.15 0 6.225.775Q33.3 28.4 36.7 29.9q1.6.7 2.6 2.125t1 3.425v5Zm3.4-3.4h25.8V35.5q0-.8-.475-1.525-.475-.725-1.175-1.075-3.15-1.5-5.775-2.075Q26.85 30.25 24 30.25q-2.85 0-5.525.575Q15.8 31.4 12.7 32.9q-.7.35-1.15 1.075-.45.725-.45 1.525ZM24 20.4q1.9 0 3.15-1.25T28.4 16q0-1.9-1.25-3.15T24 11.6q-1.9 0-3.15 1.25T19.6 16q0 1.9 1.25 3.15T24 20.4Zm0-4.4Zm0 21.05Z"></path>
                                    </svg>
                                </div>
                                <div class="detail__text is--cancelled">Bethany Struckmeyer</div>
                            </div>
                            <div class="client__detail">
                                <div class="detail__icon is--cancelled w-embed">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"
                                         fill="currentColor">
                                        <path d="M29.85 37q-2.05 0-3.45-1.4-1.4-1.4-1.4-3.45 0-2.05 1.4-3.45 1.4-1.4 3.45-1.4 2.05 0 3.45 1.4 1.4 1.4 1.4 3.45 0 2.05-1.4 3.45-1.4 1.4-3.45 1.4ZM9.1 44.3q-1.35 0-2.375-1.025T5.7 40.9V10.1q0-1.4 1.025-2.4t2.375-1h3.15v-3h3.45v3h16.6v-3h3.45v3h3.15q1.4 0 2.4 1t1 2.4v30.8q0 1.35-1 2.375T38.9 44.3Zm0-3.4h29.8V19.5H9.1v21.4Zm0-24.4h29.8v-6.4H9.1Zm0 0v-6.4 6.4Z"></path>
                                    </svg>
                                </div>
                                <div class="detail__text is--cancelled">March 6, 2022</div>
                            </div>
                        </div>
                    </div>
                    <nav class="accordion__dropdown is-cancelled w-dropdown-list">
                        <div class="app__info is--cancelled">
                            <div class="client__detail is--shrunk">
                                <div class="detail__icon is--cancelled w-embed">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"
                                         fill="currentColor">
                                        <path d="m31.2 33.7 2.45-2.45-7.85-7.9V13.4h-3.3v11.25ZM24 44.3q-4.15 0-7.875-1.6-3.725-1.6-6.475-4.35Q6.9 35.6 5.3 31.875 3.7 28.15 3.7 24t1.6-7.875Q6.9 12.4 9.65 9.65 12.4 6.9 16.125 5.3 19.85 3.7 24 3.7t7.875 1.6Q35.6 6.9 38.35 9.65q2.75 2.75 4.35 6.475Q44.3 19.85 44.3 24t-1.6 7.875q-1.6 3.725-4.35 6.475-2.75 2.75-6.45 4.35-3.7 1.6-7.9 1.6ZM24 24Zm0 16.9q6.95 0 11.925-4.95Q40.9 31 40.9 24q0-6.95-4.975-11.925Q30.95 7.1 24 7.1q-6.95 0-11.925 4.975Q7.1 17.05 7.1 24q0 7 4.975 11.95Q17.05 40.9 24 40.9Z"></path>
                                    </svg>
                                </div>
                                <div class="detail__text">3:45 pm</div>
                            </div>
                            <div class="client__detail is--aligned-top is--top-adjusted is--shrunk">
                                <div class="detail__icon is--cancelled w-embed">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"
                                         fill="currentColor">
                                        <path d="M9.1 42.35q-1.4 0-2.4-1t-1-2.45V9.15q0-1.4 1-2.425T9.1 5.7h9.95q.35-1.75 1.725-2.875T24 1.7q1.85 0 3.225 1.125T28.95 5.7h9.95q1.4 0 2.4 1.025t1 2.425V38.9q0 1.45-1 2.45-1 1-2.4 1Zm0-3.45h29.8V9.15H9.1V38.9Zm5-5h13.55v-3H14.1Zm0-8.4h19.8v-3H14.1Zm0-8.35h19.8v-3H14.1Zm9.9-8.9q.75 0 1.275-.55.525-.55.525-1.25 0-.75-.525-1.3T24 4.6q-.75 0-1.275.55-.525.55-.525 1.25 0 .75.525 1.3T24 8.25ZM9.1 38.9V9.15 38.9Z"></path>
                                    </svg>
                                </div>
                                <div class="client__detail-services is--top-adjusted">
                                    <div>Hydrafacial</div>
                                    <div>Botox</div>
                                    <div>BAM Signature Facial</div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                <div data-hover="false" data-delay="0" data-w-id="38338ad4-7636-b001-1624-fa06efd87bdd"
                     style="height:56px" class="accordion drawer__app is--complete w-dropdown">
                    <div class="accordion__toggle w-dropdown-toggle">
                        <div class="accordion__icon is--complete w-icon-dropdown-toggle"></div>
                        <div class="app__bar">
                            <div class="client__detail is--smaller">
                                <div class="detail__icon is--completed w-embed">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"
                                         fill="currentColor">
                                        <path d="m19.1 37.15-2.25-2.25L21.8 30l-4.95-4.9 2.25-2.25L24 27.8l4.9-4.95 2.25 2.25L26.2 30l4.95 4.9-2.25 2.25L24 32.2Zm-10 7.15q-1.35 0-2.375-1.025T5.7 40.9V10.1q0-1.4 1.025-2.4t2.375-1h3.15v-3h3.45v3h16.6v-3h3.45v3h3.15q1.4 0 2.4 1t1 2.4v30.8q0 1.35-1 2.375T38.9 44.3Zm0-3.4h29.8V19.5H9.1v21.4Zm0-24.4h29.8v-6.4H9.1Zm0 0v-6.4 6.4Z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="client__detail">
                                <div class="detail__icon is--completed w-embed">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"
                                         fill="currentColor">
                                        <path d="M24 23.8q-3.45 0-5.625-2.175T16.2 16q0-3.45 2.175-5.625T24 8.2q3.45 0 5.625 2.175T31.8 16q0 3.45-2.175 5.625T24 23.8ZM7.7 40.45v-5q0-2 1-3.425 1-1.425 2.55-2.175 3.4-1.5 6.5-2.25t6.25-.75q3.15 0 6.225.775Q33.3 28.4 36.7 29.9q1.6.7 2.6 2.125t1 3.425v5Zm3.4-3.4h25.8V35.5q0-.8-.475-1.525-.475-.725-1.175-1.075-3.15-1.5-5.775-2.075Q26.85 30.25 24 30.25q-2.85 0-5.525.575Q15.8 31.4 12.7 32.9q-.7.35-1.15 1.075-.45.725-.45 1.525ZM24 20.4q1.9 0 3.15-1.25T28.4 16q0-1.9-1.25-3.15T24 11.6q-1.9 0-3.15 1.25T19.6 16q0 1.9 1.25 3.15T24 20.4Zm0-4.4Zm0 21.05Z"></path>
                                    </svg>
                                </div>
                                <div class="detail__text is--completed">Bethany Struckmeyer</div>
                            </div>
                            <div class="client__detail">
                                <div class="detail__icon is--completed w-embed">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"
                                         fill="currentColor">
                                        <path d="M29.85 37q-2.05 0-3.45-1.4-1.4-1.4-1.4-3.45 0-2.05 1.4-3.45 1.4-1.4 3.45-1.4 2.05 0 3.45 1.4 1.4 1.4 1.4 3.45 0 2.05-1.4 3.45-1.4 1.4-3.45 1.4ZM9.1 44.3q-1.35 0-2.375-1.025T5.7 40.9V10.1q0-1.4 1.025-2.4t2.375-1h3.15v-3h3.45v3h16.6v-3h3.45v3h3.15q1.4 0 2.4 1t1 2.4v30.8q0 1.35-1 2.375T38.9 44.3Zm0-3.4h29.8V19.5H9.1v21.4Zm0-24.4h29.8v-6.4H9.1Zm0 0v-6.4 6.4Z"></path>
                                    </svg>
                                </div>
                                <div class="detail__text is--completed">March 6, 2022</div>
                            </div>
                        </div>
                    </div>
                    <nav class="accordion__dropdown is--completed w-dropdown-list">
                        <div class="app__info is--completed">
                            <div class="client__detail is--shrunk">
                                <div class="detail__icon is--completed w-embed">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"
                                         fill="currentColor">
                                        <path d="m31.2 33.7 2.45-2.45-7.85-7.9V13.4h-3.3v11.25ZM24 44.3q-4.15 0-7.875-1.6-3.725-1.6-6.475-4.35Q6.9 35.6 5.3 31.875 3.7 28.15 3.7 24t1.6-7.875Q6.9 12.4 9.65 9.65 12.4 6.9 16.125 5.3 19.85 3.7 24 3.7t7.875 1.6Q35.6 6.9 38.35 9.65q2.75 2.75 4.35 6.475Q44.3 19.85 44.3 24t-1.6 7.875q-1.6 3.725-4.35 6.475-2.75 2.75-6.45 4.35-3.7 1.6-7.9 1.6ZM24 24Zm0 16.9q6.95 0 11.925-4.95Q40.9 31 40.9 24q0-6.95-4.975-11.925Q30.95 7.1 24 7.1q-6.95 0-11.925 4.975Q7.1 17.05 7.1 24q0 7 4.975 11.95Q17.05 40.9 24 40.9Z"></path>
                                    </svg>
                                </div>
                                <div class="detail__text">3:45 pm</div>
                            </div>
                            <div class="client__detail is--aligned-top is--top-adjusted is--shrunk">
                                <div class="detail__icon is--completed w-embed">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"
                                         fill="currentColor">
                                        <path d="M9.1 42.35q-1.4 0-2.4-1t-1-2.45V9.15q0-1.4 1-2.425T9.1 5.7h9.95q.35-1.75 1.725-2.875T24 1.7q1.85 0 3.225 1.125T28.95 5.7h9.95q1.4 0 2.4 1.025t1 2.425V38.9q0 1.45-1 2.45-1 1-2.4 1Zm0-3.45h29.8V9.15H9.1V38.9Zm5-5h13.55v-3H14.1Zm0-8.4h19.8v-3H14.1Zm0-8.35h19.8v-3H14.1Zm9.9-8.9q.75 0 1.275-.55.525-.55.525-1.25 0-.75-.525-1.3T24 4.6q-.75 0-1.275.55-.525.55-.525 1.25 0 .75.525 1.3T24 8.25ZM9.1 38.9V9.15 38.9Z"></path>
                                    </svg>
                                </div>
                                <div class="client__detail-services is--top-adjusted">
                                    <div>Hydrafacial</div>
                                    <div>Botox</div>
                                    <div>BAM Signature Facial</div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <div class="textline is--drawer">
                <div class="textline__container is--drawer">
                    <div class="textline__text is--drawer">Files</div>
                </div>
            </div>
            <div class="files">
                <div class="file">
                    <div class="file__icon w-embed">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="currentColor">
                            <path d="M12.5 40q-4.3 0-7.4-3.1Q2 33.8 2 29.5q0-3.9 2.475-6.875t6.375-3.575q1-4.85 4.7-7.925T24.1 8.05q5.65 0 9.475 4.075Q37.4 16.2 37.4 21.9v1.2q3.6-.1 6.1 2.325Q46 27.85 46 31.55q0 3.45-2.5 5.95T37.55 40H25.5q-1.2 0-2.1-.9-.9-.9-.9-2.1V24.1l-4.15 4.15-2.15-2.15 7.8-7.8 7.8 7.8-2.15 2.15-4.15-4.15V37h12.05q2.25 0 3.85-1.6t1.6-3.85q0-2.25-1.6-3.85t-3.85-1.6H34.4v-4.2q0-4.45-3.025-7.65t-7.475-3.2q-4.45 0-7.5 3.2t-3.05 7.65h-.95q-3.1 0-5.25 2.175T5 29.45q0 3.1 2.2 5.325T12.5 37h7v3ZM24 25.5Z"></path>
                        </svg>
                    </div>
                    <div class="file__name">Upload File...</div>
                </div>
                <div class="file">
                    <div class="file__icon w-embed">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24"
                             stroke="currentColor" fit="" height="100%" width="100%"
                             preserveaspectratio="xMidYMid meet" focusable="false">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <div class="file__name">Biometric portrait</div>
                    <div class="file__badge is--jpg">
                        <div class="file__badge-text">JPG</div>
                    </div>
                </div>
                <div class="file">
                    <div class="file__icon w-embed">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24"
                             stroke="currentColor" fit="" height="100%" width="100%"
                             preserveaspectratio="xMidYMid meet" focusable="false">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <div class="file__name">Contract #123</div>
                    <div class="file__badge is--pdf">
                        <div class="file__badge-text">PDF</div>
                    </div>
                </div>
                <div class="file">
                    <div class="file__icon w-embed">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24"
                             stroke="currentColor" fit="" height="100%" width="100%"
                             preserveaspectratio="xMidYMid meet" focusable="false">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <div class="file__name">Crash Logs</div>
                    <div class="file__badge">
                        <div class="file__badge-text">TXT</div>
                    </div>
                </div>
                <div class="file">
                    <div class="file__icon w-embed">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24"
                             stroke="currentColor" fit="" height="100%" width="100%"
                             preserveaspectratio="xMidYMid meet" focusable="false">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <div class="file__name">Shopping list</div>
                    <div class="file__badge is--doc">
                        <div class="file__badge-text">DOC</div>
                    </div>
                </div>
                <div class="file">
                    <div class="file__icon w-embed">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24"
                             stroke="currentColor" fit="" height="100%" width="100%"
                             preserveaspectratio="xMidYMid meet" focusable="false">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <div class="file__name">Summer budget</div>
                    <div class="file__badge is--xls">
                        <div class="file__badge-text">XLS</div>
                    </div>
                </div>
            </div>
        </div>
        <div id="w-node-f63cf898-35fc-1e53-50c7-2c1f899c944e-630e5788" class="drawer__body is--editor">
            <div class="client__form w-form">
                <form id="client-form" name="email-form-3" data-name="Email Form 3" method="get"><label
                        for="name">Name *</label>
                    <div class="inputfield is--client">
                        <div class="inputfield__icon w-embed">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="currentColor">
                                <path d="M11.15 35.1q3.15-1.95 6.2-2.975Q20.4 31.1 24 31.1q3.6 0 6.7 1.025t6.2 2.975q2.2-2.7 3.1-5.4.9-2.7.9-5.7 0-7.2-4.85-12.05Q31.2 7.1 24 7.1q-7.2 0-12.05 4.85Q7.1 16.8 7.1 24q0 3 .925 5.7t3.125 5.4ZM24 25.6q-2.95 0-4.925-2-1.975-2-1.975-4.95 0-2.9 2-4.9 2-2 4.9-2 2.95 0 4.925 2 1.975 2 1.975 4.95 0 2.9-2 4.9-2 2-4.9 2Zm0 18.7q-4.25 0-7.95-1.6T9.6 38.325q-2.75-2.775-4.325-6.45Q3.7 28.2 3.7 24q0-4.25 1.6-7.925T9.675 9.65q2.775-2.75 6.45-4.35Q19.8 3.7 24.05 3.7q4.2 0 7.875 1.6t6.425 4.35q2.75 2.75 4.35 6.45 1.6 3.7 1.6 7.9t-1.6 7.875q-1.6 3.675-4.35 6.45Q35.6 41.1 31.9 42.7T24 44.3Z"></path>
                            </svg>
                        </div>
                        <input type="text" class="inputfield__input w-input" maxlength="256" name="name"
                               data-name="name" placeholder="John Doe" id="name" required="">
                    </div>
                    <label for="email">Email</label>
                    <div class="inputfield is--client">
                        <div class="inputfield__icon w-embed">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="currentColor">
                                <path d="M7.1 40.3q-1.35 0-2.375-1.025T3.7 36.9V11.1q0-1.4 1.025-2.4t2.375-1h33.8q1.4 0 2.4 1t1 2.4v25.8q0 1.35-1 2.375T40.9 40.3Zm16.9-15 16.9-11.15V11.1L24 22 7.1 11.1v3.05Z"></path>
                            </svg>
                        </div>
                        <input type="email" class="inputfield__input w-input" maxlength="256" name="email"
                               data-name="email" placeholder="john@email.com" id="email" required="">
                    </div>
                    <label for="phone">Phone</label>
                    <div class="inputfield is--client">
                        <div class="inputfield__icon w-embed">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="currentColor">
                                <path d="M13 46q-1.2 0-2.1-.9-.9-.9-.9-2.1V5q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v38q0 1.2-.9 2.1-.9.9-2.1.9Zm11-3.75q.65 0 1.075-.425.425-.425.425-1.075 0-.65-.425-1.075-.425-.425-1.075-.425-.65 0-1.075.425-.425.425-.425 1.075 0 .65.425 1.075.425.425 1.075.425ZM13 35.5h22v-26H13Z"></path>
                            </svg>
                        </div>
                        <input type="tel" class="inputfield__input w-input" maxlength="256" name="phone"
                               data-name="phone" placeholder="••• ••• ••••" id="phone" required="">
                    </div>
                    <label for="name-2">Address</label>
                    <div class="inputfield is--client">
                        <div class="inputfield__icon w-embed">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="currentColor">
                                <path d="M24 23.5q1.45 0 2.475-1.025Q27.5 21.45 27.5 20q0-1.45-1.025-2.475Q25.45 16.5 24 16.5q-1.45 0-2.475 1.025Q20.5 18.55 20.5 20q0 1.45 1.025 2.475Q22.55 23.5 24 23.5ZM24 44q-8.05-6.85-12.025-12.725Q8 25.4 8 20.4q0-7.5 4.825-11.95Q17.65 4 24 4q6.35 0 11.175 4.45Q40 12.9 40 20.4q0 5-3.975 10.875T24 44Z"></path>
                            </svg>
                        </div>
                        <input type="text" class="inputfield__input w-input" maxlength="256" name="address"
                               data-name="address" placeholder="" id="address" required="">
                    </div>
                    <label for="name-2">Birthday</label>
                    <div class="inputfield is--client">
                        <div class="inputfield__icon w-embed">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="currentColor">
                                <path d="M8 44q-.85 0-1.425-.575Q6 42.85 6 42V31.05q0-1.25.875-2.125T9 28.05h30q1.25 0 2.125.875T42 31.05V42q0 .85-.575 1.425Q40.85 44 40 44Zm2.35-18.95v-6.1q0-1.25.875-2.125t2.125-.875h9.15v-3.2q-1-.7-1.525-1.525-.525-.825-.525-1.975 0-.75.275-1.425T21.5 6.65L24 4l2.5 2.65q.5.5.8 1.175.3.675.3 1.425 0 1.15-.55 1.975-.55.825-1.55 1.525v3.2h9.15q1.25 0 2.125.875t.875 2.125v6.1Z"></path>
                            </svg>
                        </div>
                        <input type="text" class="inputfield__input w-input" maxlength="256" name="birthday"
                               data-name="birthday" placeholder="01-05-1996" id="birthday" required="">
                    </div>
                    <label for="name-2">Notes</label>
                    <div class="inputfield is--client is--textarea">
                        <div class="inputfield__icon w-embed">
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" fill="currentColor">
                                <path d="M9 42q-1.3 0-2.15-.85Q6 40.3 6 39V9q0-1.3.85-2.15Q7.7 6 9 6h10.1q.35-1.75 1.725-2.875T24 2q1.8 0 3.175 1.125Q28.55 4.25 28.9 6H39q1.3 0 2.15.85Q42 7.7 42 9v30q0 1.3-.85 2.15Q40.3 42 39 42Zm0-3h30V9h-3v4.5H12V9H9v30ZM24 9q.85 0 1.425-.575Q26 7.85 26 7q0-.85-.575-1.425Q24.85 5 24 5q-.85 0-1.425.575Q22 6.15 22 7q0 .85.575 1.425Q23.15 9 24 9Z"></path>
                            </svg>
                        </div>
                        <textarea placeholder="Example Text" maxlength="5000" id="field-3" name="field-3"
                                  data-name="field" class="inputfield__textarea w-input"></textarea>
                    </div>
                </form>
                <div class="w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                </div>
                <div class="w-form-fail">
                    <div>Oops! Something went wrong while submitting the form.</div>
                </div>
            </div>
            <div class="drawer__footer">
                <div class="text-btn delete-btn">Delete</div>
                <div class="drawer__footer-right-controls">
                    <div data-w-id="69973e80-a082-9098-664f-38efd61afbc7" class="text-btn">Cancel</div>
                    <a href="#" class="primary-button w-button">Save</a>
                </div>
            </div>
        </div>
    </div>
</div>