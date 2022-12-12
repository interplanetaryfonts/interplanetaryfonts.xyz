import { useState } from 'react';
import classes from '../../styles/Overlay.module.css';
import Modal from './Modal';
import Backdrop from './Backdrop';
import Button from '../UI/Button';
import Worldcoin from './Worldcoin';

export default function CreateProject(props) {
  const [mounted, setMounted] = useState(false),
    handleMount = bool => {
      setMounted(bool);
    };
  return (
    <>
      <Backdrop mounted={props.mounted} handleMount={props.handleMount} />
      <Modal mounted={props.mounted} handleMount={props.handleMount}>
        <div className={classes['modal-content']}>
          <p>Upload font files</p>
          <Button>Upload</Button>
          <div className={classes['elements-block']}>
            <label htmlFor='price'>{`Set Price`}</label>
            <input
              className={classes.price}
              type='number'
              min='0.0001'
              step='0.1'
              required
              name='price'
              id='price'
              placeholder='0.0000 MATIC'
            />
          </div>
          <div className={classes['elements-block']}>
            <p>Verify Humanity</p>
            <button
              className={classes.worldcoin}
              onClick={() => handleMount(true)}
            >
              <svg
                width='49'
                height='45'
                viewBox='0 0 49 45'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M27.0591 11.8961C27.6305 9.51695 33.2885 3.56261 35.9881 5.54944C39.131 7.93476 35.4653 12.724 34.1738 14.5759C34.1738 14.5759 33.915 12.0126 31.8561 9.68864C30.2135 10.7249 28.6952 11.7673 27.8035 12.3928C27.7228 12.4452 27.6292 12.473 27.5344 12.4726C27.4383 12.4722 27.3448 12.4438 27.2654 12.3908C27.1859 12.3378 27.1244 12.2625 27.0872 12.1745C27.0501 12.0865 27.0411 11.9897 27.0591 11.8961ZM29.3653 15.4895C29.2974 15.5211 29.2372 15.5689 29.1924 15.6288C29.1475 15.6888 29.118 15.7588 29.1065 15.8329C29.0847 15.9478 29.1078 16.0667 29.168 16.1665C29.2295 16.2661 29.3256 16.3396 29.4384 16.3726C30.4839 16.6792 32.2494 17.2188 34.0816 17.8565C33.5409 20.9103 31.6959 22.7069 31.6959 22.7069C33.9522 22.5597 39.9856 22.4433 39.9049 18.5003C39.7883 15.1584 31.5908 14.4531 29.3653 15.4895ZM27.9816 19.5244C27.8944 19.4818 27.7971 19.4666 27.701 19.481C27.6062 19.4953 27.5178 19.5383 27.4473 19.6043C27.3768 19.6704 27.3281 19.7563 27.3089 19.8505C27.2884 19.9447 27.2987 20.0427 27.3358 20.1315C27.742 21.1372 28.4236 22.848 29.0642 24.6815C26.3275 26.1594 23.7688 25.8343 23.7688 25.8343C25.2884 27.5022 29.1373 32.138 32.1751 29.6239C34.7274 27.4531 30.1827 20.6159 27.9816 19.5244ZM23.9533 20.9593C23.9379 20.8858 23.9046 20.8171 23.856 20.7594C23.8085 20.7017 23.7457 20.6566 23.6766 20.6282C23.5689 20.5799 23.4472 20.5739 23.3358 20.6114C23.223 20.649 23.1308 20.7273 23.0744 20.8306C22.5388 21.7749 21.6163 23.3693 20.5772 25.0064C17.7175 23.7924 16.3773 21.5909 16.3773 21.5909C16.0147 23.8168 14.7719 29.7098 18.64 30.5192C21.9302 31.1569 24.4697 23.3508 23.9533 20.9593ZM20.3248 18.7027C20.3697 18.6443 20.4017 18.5764 20.4171 18.5041C20.4312 18.4319 20.4299 18.3571 20.4107 18.2857C20.3825 18.1714 20.3107 18.072 20.2121 18.0073C20.1121 17.9426 19.993 17.9172 19.8764 17.9362C18.8001 18.1079 16.9731 18.3839 15.0422 18.5923C14.212 15.5999 15.1037 13.19 15.1037 13.19C13.1306 14.2876 7.73654 16.9918 9.5085 20.5055C11.0575 23.4734 18.763 20.5913 20.3248 18.7027ZM19.8264 14.4654C19.902 14.4677 19.9763 14.4515 20.0442 14.4184C20.1121 14.3852 20.1698 14.3362 20.2146 14.2754C20.2851 14.1803 20.3184 14.0626 20.3069 13.9447C20.2954 13.827 20.2402 13.7175 20.1531 13.6376C19.3472 12.9079 17.9942 11.657 16.6297 10.2773C18.4619 7.76921 20.9091 6.96595 20.9091 6.96595C18.8181 6.10746 13.3394 3.57491 11.6854 7.1561C10.3195 10.2098 17.3728 14.4287 19.8264 14.4654ZM23.2397 11.6263C23.3575 11.6221 23.4703 11.5748 23.5549 11.4934C23.6407 11.4119 23.692 11.3021 23.7009 11.1849C23.7688 10.0994 23.9162 8.26599 24.1442 6.34053C27.2551 6.20561 29.4076 7.61597 29.4076 7.61597C28.7811 5.45129 27.3537 -0.398618 23.5164 0.533421C20.2697 1.37346 21.3524 9.50464 22.8463 11.4484C22.8937 11.5068 22.954 11.5532 23.0219 11.5841C23.0898 11.615 23.1654 11.6294 23.2397 11.6263Z'
                  fill='url(#paint0_linear_24_9)'
                />
                <path
                  d='M8.44003 37.4542L7.1998 42.6553L5.70328 37.4542H4.48353L3.01779 42.6553L1.74678 37.4542H0.373291L2.40279 44.3623H3.58154L5.09853 39.0707L6.63604 44.3623H7.81479L9.81354 37.4542H8.44003ZM13.583 44.4827C15.6945 44.4827 17.0372 42.8662 17.0372 40.9082C17.0372 38.9402 15.715 37.3337 13.583 37.3337C11.451 37.3337 10.1287 38.9402 10.1287 40.9082C10.1287 42.8662 11.451 44.4827 13.583 44.4827ZM13.583 43.4787C12.1992 43.4787 11.4202 42.3742 11.4202 40.9082C11.4202 39.4423 12.1992 38.3378 13.583 38.3378C14.9462 38.3378 15.7457 39.4423 15.7457 40.9082C15.7457 42.3742 14.9667 43.4787 13.583 43.4787ZM22.2212 44.3623H23.6869L21.6882 41.4504C22.4774 41.2396 23.2667 40.6974 23.2667 39.4623C23.2667 38.1671 22.3237 37.4542 20.8887 37.4542H18.1109V44.3623H19.3717V41.5307H20.3147L22.2212 44.3623ZM19.3717 38.5386H20.9194C21.6677 38.5386 22.0367 38.9101 22.0367 39.4925C22.0367 40.0748 21.6472 40.4463 20.9194 40.4463H19.3717V38.5386ZM24.5044 44.3623H29.2296V43.2979H25.7651V37.4542H24.5044V44.3623ZM30.2572 44.3623H32.9529C35.0439 44.3623 36.3252 42.8963 36.3252 40.8881C36.3252 38.8097 35.0747 37.4542 32.8197 37.4542H30.2572V44.3623ZM31.5282 43.2778V38.5386H32.4404C34.1522 38.5386 35.0337 39.1711 35.0337 40.8881C35.0337 42.2537 34.3367 43.2778 32.8914 43.2778H31.5282ZM39.6615 44.3623H40.9325V37.4542H39.6615V44.3623ZM42.2625 44.3623H44.9582C47.0492 44.3623 48.3305 42.8963 48.3305 40.8881C48.3305 38.8097 47.08 37.4542 44.825 37.4542H42.2625V44.3623ZM43.5335 43.2778V38.5386H44.4457C46.1575 38.5386 47.039 39.1711 47.039 40.8881C47.039 42.2537 46.342 43.2778 44.8967 43.2778H43.5335Z'
                  fill='url(#paint1_linear_24_9)'
                />
                <defs>
                  <linearGradient
                    id='paint0_linear_24_9'
                    x1='9.15616'
                    y1='15.4947'
                    x2='39.9061'
                    y2='15.4947'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#FF6848' />
                    <stop offset='1' stopColor='#4940E0' />
                  </linearGradient>
                  <linearGradient
                    id='paint1_linear_24_9'
                    x1='0.18751'
                    y1='41.8521'
                    x2='48.875'
                    y2='41.8521'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#FF6848' />
                    <stop offset='1' stopColor='#4940E0' />
                  </linearGradient>
                </defs>
              </svg>
            </button>
            <Button onClick={() => props.handleMount(false)}>
              Create Project
            </Button>
          </div>
        </div>
      </Modal>
      <Worldcoin handleMount={handleMount} mounted={mounted} />
    </>
  );
}
