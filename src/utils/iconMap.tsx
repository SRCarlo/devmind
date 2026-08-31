import React from 'react';
import { 
  FaReact, 
  FaNodeJs, 
  FaGitAlt, 
  FaGithub, 
  FaDocker,
  FaPython,
  FaJava
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiJavascript, 
  SiHtml5, 
  SiCss, 
  SiTailwindcss, 
  SiVite, 
  SiNextdotjs, 
  SiPostgresql, 
  SiGraphql, 
  SiVitest, 
  SiRedux, 
  SiGooglechrome,
  SiGit,
  SiRust,
  SiGo,
  SiLinux,
  SiMongodb,
  SiKubernetes,
  SiCplusplus,
  SiSpringboot
} from 'react-icons/si';
import { 
  FiCode, 
  FiCpu, 
  FiLayers, 
  FiServer, 
  FiShield, 
  FiDatabase, 
  FiGlobe,
  FiTerminal
} from 'react-icons/fi';

export const getTopicIcon = (iconName: string, className = 'w-5 h-5'): React.ReactNode => {
  switch (iconName) {
    case 'FaReact':
    case 'SiReact':
      return <FaReact className={className} />;
    case 'FaPython':
    case 'SiPython':
      return <FaPython className={className} />;
    case 'FaJava':
    case 'SiJava':
      return <FaJava className={className} />;
    case 'SiCplusplus':
      return <SiCplusplus className={className} />;
    case 'SiRust':
      return <SiRust className={className} />;
    case 'SiGo':
      return <SiGo className={className} />;
    case 'SiLinux':
      return <SiLinux className={className} />;
    case 'SiMongodb':
      return <SiMongodb className={className} />;
    case 'SiKubernetes':
      return <SiKubernetes className={className} />;
    case 'SiSpringboot':
      return <SiSpringboot className={className} />;
    case 'SiTypescript':
      return <SiTypescript className={className} />;
    case 'SiJavascript':
      return <SiJavascript className={className} />;
    case 'SiHtml5':
      return <SiHtml5 className={className} />;
    case 'SiCss3':
    case 'SiCss':
      return <SiCss className={className} />;
    case 'SiTailwindcss':
      return <SiTailwindcss className={className} />;
    case 'SiVite':
      return <SiVite className={className} />;
    case 'SiNextdotjs':
      return <SiNextdotjs className={className} />;
    case 'SiPostgresql':
      return <SiPostgresql className={className} />;
    case 'SiGraphql':
      return <SiGraphql className={className} />;
    case 'SiVitest':
      return <SiVitest className={className} />;
    case 'SiRedux':
      return <SiRedux className={className} />;
    case 'SiGooglechrome':
      return <SiGooglechrome className={className} />;
    case 'SiGit':
    case 'FaGitAlt':
      return <SiGit className={className} />;
    case 'SiNodedotjs':
    case 'FaNodeJs':
      return <FaNodeJs className={className} />;
    case 'SiDocker':
    case 'FaDocker':
      return <FaDocker className={className} />;
    case 'FaGithub':
      return <FaGithub className={className} />;
    case 'FiDatabase':
      return <FiDatabase className={className} />;
    case 'FiServer':
      return <FiServer className={className} />;
    case 'FiShield':
      return <FiShield className={className} />;
    case 'FiGlobe':
      return <FiGlobe className={className} />;
    case 'FiTerminal':
      return <FiTerminal className={className} />;
    case 'FiCpu':
      return <FiCpu className={className} />;
    default:
      return <FiCode className={className} />;
  }
};
