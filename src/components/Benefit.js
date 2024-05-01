import React from "react";

import styles from "./Benefit.module.css";
import classNames from "classnames";

function Benefit(params) {
  return (
    <div className={styles.wrapper} data-aos="fade-up">
      <div className="container">
        <div className="row">
          <div className={classNames("col-lg-3", styles.benefitCol)}>
            <div
              className={classNames(
                "d-flex flex-row align-items-center",
                styles.benefitItem
              )}
            >
              <div className={styles.benefitIcon}>
                <i className="fa fa-truck" aria-hidden="true"></i>
              </div>
              <div className="benefit_content">
                <h6>free shipping</h6>
                <p>Suffered Alteration in Some Form</p>
              </div>
            </div>
          </div>
          <div className={classNames("col-lg-3", styles.benefitCol)}>
            <div
              className={classNames(
                "d-flex flex-row align-items-center",
                styles.benefitItem
              )}
            >
              <div className={styles.benefitIcon}>
                <i class="fa-solid fa-money-bill"></i>
              </div>
              <div className="benefit_content">
                <h6>cach on delivery</h6>
                <p>The Internet Tend To Repeat</p>
              </div>
            </div>
          </div>
          <div className={classNames("col-lg-3", styles.benefitCol)}>
            <div
              className={classNames(
                "d-flex flex-row align-items-center",
                styles.benefitItem
              )}
            >
              <div className={styles.benefitIcon}>
                <i className="fa fa-undo" aria-hidden="true"></i>
              </div>
              <div className="benefit_content">
                <h6>45 days return</h6>
                <p>Making it Look Like Readable</p>
              </div>
            </div>
          </div>
          <div className={classNames("col-lg-3", styles.benefitCol)}>
            <div
              className={classNames(
                "d-flex flex-row align-items-center",
                styles.benefitItem
              )}
            >
              <div className={styles.benefitIcon}>
                <i className="far fa-clock"></i>
              </div>
              <div className="benefit_content">
                <h6>opening all week</h6>
                <p>8AM - 09PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Benefit;
